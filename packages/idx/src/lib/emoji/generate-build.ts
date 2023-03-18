/* eslint-disable @typescript-eslint/ban-ts-comment */
import { readFileSync, writeFileSync } from 'fs';
import { IDataByEmoji, IDataByGroup, IDataEmojiComponents } from '.';


// Final data holder
const orderedEmoji: string[] = [];
const dataByEmoji: IDataByEmoji = {};
const dataByGroup: IDataByGroup[] = [];
const emojiComponents: IDataEmojiComponents = {};

const VARIATION_16 = String.fromCodePoint(0xfe0f);
const SKIN_TONE_VARIATION_DESC = /\sskin\stone(?:,|$)/;

const orderedEmojiData = readFileSync('./dist/emoji/emoji-order.txt', 'utf-8');
const groupedEmojiData = readFileSync('./dist/emoji/emoji-group.txt', 'utf-8');

/**
 * 'flag: St. Kitts & Nevis' -> 'flag_st_kitts_nevis'
 * 'family: woman, woman, boy, boy' -> 'family_woman_woman_boy_boy'
 * 'A button (blood type)' -> 'a_button'
 * 'Cocos (Keeling) Islands' -> 'cocos_islands'
 * 'keycap *' -> 'keycap_asterisk'
 *
 * returns machine readable emoji short code
 */
const slugify = (str: string): string => {
    const SLUGIFY_REPLACEMENT = { '*': 'asterisk', '#': 'number sign' };

    type KEY = keyof typeof SLUGIFY_REPLACEMENT;
    type VAL = typeof SLUGIFY_REPLACEMENT[KEY];

    for (const key in SLUGIFY_REPLACEMENT) {
        str = str.replace(key, SLUGIFY_REPLACEMENT[key as KEY] as VAL);
    }

    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\(.+\)/g, '')
        .trim()
        .replace(/[\W|_]+/g, '_')
        .toLowerCase();
};

// The group data tells if the emoji is one of the following:
//   component
//   fully-qualified
//   minimally-qualified
//   unqualified
//
// We only want fully-qualified emoji in the output data

// # group: Smileys & Emotion
//          |1--------------|
//
const GROUP_REGEX = /^#\sgroup:\s(?<name>.+)/;

// 1F646 200D 2640 FE0F                       ; fully-qualified     # 🙆‍♀️ E4.0 woman gesturing OK
//                                              |1------------|      |2--||3-| |4---------------|
// 1F469 200D 1F469 200D 1F467 200D 1F467     ; fully-qualified     # 👩‍👩‍👧‍👧 E2.0 family: woman, woman, girl, girl
//                                              |1------------|      |2-| |3| |4-----------------------------|
//
const EMOJI_REGEX = /^[^#]+;\s(?<type>[\w-]+)\s+#\s(?<emoji>\S+)\sE(?<emojiversion>\d+\.\d)\s(?<desc>.+)/;

let currentGroup: undefined | string | null = null;

groupedEmojiData.split('\n').forEach((line) => {
    const groupMatch = line.match(GROUP_REGEX);

    if (groupMatch) {
        currentGroup = groupMatch.groups?.['name'];
    } else {
        const emojiMatch = line.match(EMOJI_REGEX);

        if (emojiMatch) {
            const { groups } = emojiMatch;

            const desc: string | undefined = groups?.['desc'];

            const emoji: string | undefined = groups?.['emoji'];

            const emojiversion: string | undefined = groups?.['emojiversion'];

            const type: string | undefined | 'component' | 'unqualified' | 'fully-qualified' | 'minimally-qualified' =
                groups?.['type'];

            switch (type) {
                case 'fully-qualified':
                    if (emoji === undefined || line.match(SKIN_TONE_VARIATION_DESC)) return;

                    // @ts-ignore
                    dataByEmoji[emoji] = {
                        // @ts-ignore
                        name: null,
                        // @ts-ignore
                        slug: null,
                        // @ts-ignore
                        group: currentGroup,
                        // @ts-ignore
                        unicode_version: null,
                        // @ts-ignore
                        skin_tone_support: null,
                        // @ts-ignore
                        emoji_version: emojiversion,
                    };
                    break;
                case 'component':
                    // @ts-ignore
                    emojiComponents[slugify(desc)] = emoji;
                    break;

                default:
                    break;
            }
        }
    }
});

// U+1F44B ; 6.0 # 👋 waving hand
//          |1--| |2-|3----------|
//
// U+1F442 U+1F3FB ; 8.0 # 👂🏻 ear: light skin tone
//                  |1--| |2-|3--||4--------------|
//
// U+1F469 U+200D U+1F467 U+200D U+1F467 ; 6.0 # 👩‍👧‍👧 family: woman, girl, girl
//                                        |1--| |2-|3-----||4----------------|
//
const ORDERED_EMOJI_REGEX = /.+\s;\s(?<version>[0-9.]+)\s#\s(?<emoji>\S+)\s(?<name>[^:]+)(?::\s)?(?<desc>.+)?/;

let currentEmoji: null | string = null;

orderedEmojiData.split('\n').forEach((line) => {
    if (line.length === 0) return;

    const match = line.match(ORDERED_EMOJI_REGEX);
    if (!match) return;

    const { groups } = match;

    const name: string | undefined = groups?.['name'];
    const desc: string | undefined = groups?.['desc'];
    const emoji: string | undefined = groups?.['emoji'];
    const version: string | undefined = groups?.['version'];

    const isSkinToneVariation = desc && !!desc.match(SKIN_TONE_VARIATION_DESC);
    const fullName = desc && !isSkinToneVariation ? [name, desc].join(' ') : name;

    if (!currentEmoji || !emoji) return;

    if (isSkinToneVariation) {
        dataByEmoji[currentEmoji as keyof typeof dataByEmoji].skin_tone_support = true;
        dataByEmoji[currentEmoji as keyof typeof dataByEmoji].skin_tone_support_unicode_version = version;
    } else {
        // Workaround for ordered data missing VARIATION_16 (smiling_face)
        const emojiWithOptionalVariation16 = dataByEmoji[emoji as keyof typeof dataByEmoji]
            ? emoji
            : emoji + VARIATION_16;
        const emojiEntry = dataByEmoji[emojiWithOptionalVariation16 as keyof typeof dataByEmoji];
        if (!emojiEntry) {
            if (Object.values(emojiComponents).includes(emoji)) return;
            throw `${emoji} entry from emoji-order.txt match not found in emoji-group.txt`;
        }
        currentEmoji = emojiWithOptionalVariation16;
        orderedEmoji.push(currentEmoji);
        dataByEmoji[currentEmoji as keyof typeof dataByEmoji].name = fullName ?? '';
        dataByEmoji[currentEmoji as keyof typeof dataByEmoji].skin_tone_support = false;
        dataByEmoji[currentEmoji as keyof typeof dataByEmoji].slug = slugify(fullName ?? '');
        dataByEmoji[currentEmoji as keyof typeof dataByEmoji].unicode_version = version ?? '';
    }
});

for (const emoji of orderedEmoji) {
    const { group, skin_tone_support, skin_tone_support_unicode_version, name, slug, emoji_version, unicode_version } =
        dataByEmoji[emoji];
    let groupIndex = dataByGroup.findIndex((element) => element.name === group);
    if (groupIndex === -1) {
        dataByGroup.push({ name: group, slug: slugify(group), emojis: [] });
        groupIndex = dataByGroup.findIndex((element) => element.name === group);
    }
    dataByGroup[groupIndex].emojis.push({
        emoji,
        skin_tone_support,
        skin_tone_support_unicode_version,
        name,
        slug,
        unicode_version,
        emoji_version,
    });
}

// {
//   "😀": {
//     "group": "Smileys & Emotion",
//     "name": "grinning face",
//     "slug": "grinning_face",
//     "version": "6.1",
//     "skin_tone_support": false
//   },
//   ...
// }
writeFileSync('./dist/emoji/data-by-emoji.json', JSON.stringify(dataByEmoji, null, 4));

// {
//   "Smileys & Emotion": [
//     {
//       "emoji": "😀",
//       "skin_tone_support": false,
//       "name": "grinning face",
//       "slug": "grinning_face",
//       "version": "6.1"
//     },
//   ],
//   ...
// }
writeFileSync('./dist/emoji/data-by-group.json', JSON.stringify(dataByGroup, null, 4));

// [
//   "😀",
//   "😃",
//   ...
// ]
writeFileSync('./dist/emoji/data-ordered-emoji.json', JSON.stringify(orderedEmoji, null, 4));

// {
//   "light_skin_tone": "🏻",
//   "medium_light_skin_tone": "🏼",
//   ...
// }
writeFileSync('./dist/emoji/data-emoji-components.json', JSON.stringify(emojiComponents, null, 4));
