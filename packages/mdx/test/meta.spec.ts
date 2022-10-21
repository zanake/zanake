import { getMdxFilePaths, getMdxMetaExport } from '../src/lib/meta';

describe('mdx-meta', () => {
    describe('getMdxFilePaths function', () => {
        const param = 'packages/mdx/test/samples';

        it('should get all .mdx files that exist in a given directory', () => {

            const expected = [
                `${process.cwd()}/${param}/hello.mdx`,
                `${process.cwd()}/${param}/alphabetic/abc.mdx`,
                `${process.cwd()}/${param}/alphabetic/xyz.mdx`,
                `${process.cwd()}/${param}/alphabetic/keyboards/azerty.mdx`,
                `${process.cwd()}/${param}/alphabetic/keyboards/qwerty.mdx`,
            ];

            const actual = getMdxFilePaths(param);

            expect(actual.sort()).toEqual(expected.sort());
        });

        it('should get all .mdx files that exist in a given directory', () => {
            const actual = getMdxFilePaths(`${param}/numeric`);

            expect(actual).toHaveLength(0);
        });
    });
    
    // describe('getMdxMetaExport function', () => {
    //     const param = 'packages/mdx/test/samples';

    //     it('should retrieve the meta const variable exported in a given .mdx file', async () => {

    //         const actual = await getMdxMetaExport(`${process.cwd()}/${param}/hello.mdx`);

    //         console.log(actual);

    //         expect(actual).toHaveProperty('title', 'Hello');
    //         expect(actual).toHaveProperty('published', true);
    //         expect(actual).toHaveProperty('date', '1970-01-01');
    //         expect(actual).toHaveProperty('author', 'John Doe');
    //         expect(actual).toHaveProperty('excerpt', 'Hi ... hey ... hello ?');
    //         expect(actual).toHaveProperty('labels', ['Languages', 'Introduction']);

    //         expect(actual).toHaveProperty('thumbnail.src', '/images/featured/hello.jpg');

    //         expect(actual).toHaveProperty('thumbnail.source.name', 'Unsplash');
    //         expect(actual).toHaveProperty('thumbnail.source.url', 'https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText');

    //         expect(actual).toHaveProperty('thumbnail.artist.name', 'Wilhelm Gunkel');
    //         expect(actual).toHaveProperty('thumbnail.artist.profile', 'https://unsplash.com/@wilhelmgunkel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText');
    //     });
    // });
});
