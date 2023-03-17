# @zanake/idx

Static & usable JSON files fetched from official indexes, databases or sources

> **idx** . _noun_
>
> :short for index (an index is a list of words or phrases and associated pointers to where useful content to a lookup can be found in a document or collection of documents)

<br>

## Install

Install the package from the NPM registry using the command below:

`npm install @zanake/idx`

<br>

## Emoji files

Provides moji data from **unicode** in JSON format, in a number of easily consumable file structures.

> This data does not contain minimally-qualified and unqualified emoji.
>
> RGI: Recommended for General Interchange. A subset of emojis which is likely to be widely supported across multiple platforms.
>
> Minimally-qualified or unqualified emoji zwj sequences may be handled in the same way as their fully-qualified forms; the choice is up to the implementation.
>
> Full description can be found at http://www.unicode.org/reports/tr51/.

### Skin tone variations

Emoji's skin tone variations are consolidated into one base entry, with a `skin_tone_support` flag on them.

This means one entry of 👋 represents its 5 variations– 👋🏻, 👋🏼, 👋🏽, 👋🏾, 👋🏿; while raw unicode data list them as individual emoji entries.

`data-by-emoji.json`:

```json
{
  "😀": {
    "name": "grinning face",
    "slug": "grinning_face",
    "group": "Smileys & Emotion",
    "emoji_version": "2.0",
    "unicode_version": "6.1",
    "skin_tone_support": false
  },
  ...
  "👋": {
    "name": "waving hand",
    "slug": "waving_hand",
    "group": "People & Body",
    "emoji_version": "2.0",
    "unicode_version": "6.0",
    "skin_tone_support": true,
    "skin_tone_support_unicode_version": "8.0"
  },
}
```

`data-by-group.json`:

```json
{
  "Smileys & Emotion": [
    {
      "emoji": "😀",
      "skin_tone_support": false,
      "name": "grinning face",
      "slug": "grinning_face",
      "unicode_version": "6.1",
      "emoji_version": "2.0"
    },
  ],
  ...
}
```

`data-ordered-emoji.json`:

```
[
  "😀",
  "😃",
  ...
]
```

`data-emoji-components.json`:

```json
{
  "light_skin_tone": "🏻",
  "medium_light_skin_tone": "🏼",
  ...
}
```

<br>

## Unicode License Agreement

https://www.unicode.org/license.html
