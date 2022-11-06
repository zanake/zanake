import path from 'path';
import { promises as fs } from 'fs';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

/**
 * Extracts the meta export in a .mdx file using the React runtime
 * 
 * @param slug - An absolute file path to an .mdx file
 * 
 * @returns {Promise}
 */
export default async (file: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const filepath = path.resolve(process.cwd(), file);
        const source = await fs.readFile(filepath);

        const { meta } = await evaluate(source, {
            jsx: undefined,
            jsxs: undefined,
            Fragment: undefined,
            ...runtime, useDynamicImport: true
        });

        return meta;
    } catch (error) {
        throw(error);
    }
};