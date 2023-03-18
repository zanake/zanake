import { IStats } from '.';
import { parse } from 'fast-html-parser';
import { writeFileSync, readFileSync } from 'fs';

const html = readFileSync('dist/emoji/emoji-counts.html', 'utf-8');
const parsedRoot = parse(html);

const skinToneMarker = '🏿';
const allRows = parsedRoot.querySelectorAll('tr');

const theadCells = allRows[0].childNodes;
const totalCells = allRows[allRows.length - 1].childNodes;

const stats: IStats = {
    groups: {},
    total: 0,
    component: 0,
    skin_tone_variations: 0,
    dual_skin_tone_support: 13, // This needs to be found manually
};

const componentKey = 'Component';
const groups = [
    'Smileys & Emotion',
    'People & Body',
    'Animals & Nature',
    'Food & Drink',
    'Travel & Places',
    'Activities',
    'Objects',
    'Symbols',
    'Flags',
];

// Total count
stats.total = Number(totalCells[totalCells.length - 1].text);

// Get total count for groups
for (let i = 0; i < theadCells.length; i++) {
    const column = theadCells[i].text;

    const count = Number(totalCells[i].text);

    if (groups.includes(column)) {
        stats.groups[column] = count;
    } else if (column === componentKey) {
        stats.component = count;
    }
}

// Calculate total skin tone variations
const counts = allRows
    // Find all rows for skin tone modifiable sequences
    .filter((row) => row.childNodes[0].text.match(skinToneMarker))
    // Find the count for total count in last (total) column
    .map((row) => Number(row.childNodes[row.childNodes.length - 1].text));
stats.skin_tone_variations = counts.reduce((a, b) => a + b);

// Calculate total count without variations
stats.total_without_skin_tone_variations = stats.total - stats.skin_tone_variations - (stats?.component ?? 0);

writeFileSync('./dist/emoji/stats.json', JSON.stringify(stats, null, 4));
