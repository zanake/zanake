import path from 'path';
import { sync } from 'glob';
import {arr} from '@zanake/arr';
import { promises as fs } from 'fs';
import { toLabel } from '@zanake/str';
import { Meta, DirMeta, FileMeta, Thumbnail } from './meta.interfaces';

/**
 * 
 * @param {string} directory - A path relative to your NodeJS process.cwd()
 * @returns {Array}
 */
export const getMdxFilePaths = (directory: string) => {
    // Get the directory to search through for MDX files
    const dir = path.join(process.cwd(), ...directory.split(path.sep));

    // use the glob NPM package to find MDX files with RegExp
    const files = sync(`${dir}/**/*.mdx`);

    // ensure the array only includes pathnames with a .mdx extension
    return Array.isArray(files) && files.length && files.every((item) => item.endsWith('.mdx')) ? files : [];
};

/**
 * 
 * @param slug - A path relative or absolute to your NodeJS process.cwd()
 * 
 * @returns {FileMeta}
 */
export const getMdxMetaExport = async (file: string) => {
    try {
        const runtime = await import('react/jsx-runtime');
        const evaluate = (await import('@mdx-js/mdx')).evaluate;

        const source = await fs.readFile(path.resolve(process.cwd(), file));

        const { meta } = await evaluate(source, {
            ...runtime,
            useDynamicImport: true,
            Fragment: undefined,
            jsx: undefined,
            jsxs: undefined,
        });

        return meta;
    } catch (error) {
        // console.log(error)
        return {};
    }
};

/**
 * Gets all the MDX files as URL slugs for the UI
 *
 * @param {string} directory - a path that contains the MDX files to parse
 * @return {Array}
 */
export const getMdxMetaData = async (directory: string, baseURL: string) => {
    const result = Array<DirMeta | FileMeta>;

    const nesting = { result };

    const collection = getMdxFilePaths(directory);

    for (let index = 0; index < collection.length; index++) {
        const absolutePath = collection[index];

        const relativePath = absolutePath
            .split(new RegExp(`/${directory}/(.*)`))
            .filter((item) => item.length !== 0)
            .slice(-1)[0];

        const relativePathComponents = relativePath.split('/').filter((item) => item.length !== 0);

        await relativePathComponents.reduce(async (promise, item) => {
            const catalogue = await promise;

            if (!(catalogue as any)[item]) {
                (catalogue as any)[item] = { result: [] };

                const isFile = item.includes('.mdx');

                (catalogue.result as unknown as Array<any>).push({
                    item,
                    type: isFile ? 'file' : 'directory',
                    ...(!isFile && {
                        children: (catalogue as any)[item].result,
                    }),
                    ...(isFile && {
                        slug: `${directory}/${arr(relativePathComponents).join('/').replace(/\.mdx/g, '')}`,
                        get href() {
                            return new URL(this.slug, baseURL).toString();
                        },
                    }),
                    ...(isFile && {
                        meta: Object.entries(
                            (await getMdxMetaExport(
                                `/pages/${directory}/${arr(relativePathComponents).join('/')}`
                            )) as Meta
                        ).reduce((obj, pair) => {
                            switch (pair[0]) {
                                case 'labels':
                                    // map the label strings to descriptive objects with `name`, `slug`, `href`
                                    obj['labels'] = [...(arr(pair[1]) as Array<string>)]
                                        .map((label) => {
                                            return {
                                                name: label,
                                                slug: toLabel(label),
                                                get href() {
                                                    return new URL(`labels/${this.slug}`, baseURL).toString();
                                                },
                                            };
                                        })
                                        .filter((label, idx, arr) => {
                                            return arr.findIndex((item) => item?.slug === label?.slug) === idx;
                                        });

                                    break;

                                case 'thumbnail':
                                    // include a `href` property in the thumbnail object
                                    obj['thumbnail'] = {
                                        ...(pair[1] as Thumbnail),
                                        get href() {
                                            return new URL(obj?.thumbnail?.src, baseURL).toString();
                                        },
                                    };
                                    break;

                                default:
                                    // zip the rest of the objects
                                    (obj as any)[pair[0]] = pair[1];
                                    break;
                            }

                            return obj;
                        }, {} as Meta),
                    }),
                });
            }

            return (catalogue as any)[item];
        }, Promise.resolve(nesting));
    }

    return result;
};
