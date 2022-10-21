import meta, { getFilePaths, getFileMetaData } from '../src/lib/mdx-meta';

describe('mdx-meta', () => {
    describe('getFilePaths', () => {
        it('should get all .mdx file given a directory', () => {
            const expected = [
                'samples/hello.mdx',
                'samples/alphabetic/abc.mdx',
                'samples/alphabetic/xyz.mdx',
                'samples/alphabetic/keyboards/azerty.mdx',
                'samples/alphabetic/keyboards/qwerty.mdx',
            ];

            const results = getFilePaths('./samples');

            expect(results.sort()).toEqual(expected.sort());
        });
    });
});
