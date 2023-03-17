import { get as wget } from 'https';
import { createWriteStream } from 'fs';

let version  = '15.0';

/**
 * Get a specific version number
 * i.e `npm run download 13.0`
 */
if (process.argv[2]) version = Number(process.argv[2]).toFixed(1).toString();

const sources = {
    // Grouped emoji list with qualifier
    'emoji-group.txt': `https://unicode.org/Public/emoji/${version}/emoji-test.txt`,
    // Complete emoji list with version
    'emoji-order.txt': `https://unicode.org/emoji/charts-${version}/emoji-ordering.txt`,
    // Emoji count
    'emoji-counts.html': `https://unicode.org/emoji/charts-${version}/emoji-counts.html`,
};

for (const source of Object.entries(sources)) {
    const filename = source[0];
    const resource = source[1];

    const fileWriteStream = createWriteStream(filename);

    wget(resource, (response) => response.pipe(fileWriteStream));
}
