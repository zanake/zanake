import { useState, useEffect } from 'react';

/* eslint-disable-next-line */
export type UseEmojiCategory =
    | 'smileys_emotion'
    | 'animals_nature'
    | 'travel_places'
    | 'people_body'
    | 'food_drink'
    | 'activities'
    | 'objects'
    | 'symbols'
    | 'flags'
    | '*';

const getEmoji = async (category: UseEmojiCategory) => {
    try {
        const emoji = (await import(`./emoji.json`)).default;

        return category === '*'
            ? emoji.reduce((collection: any, { emojis }) => [...collection, ...emojis], [])
            : emoji.find(({ slug }) => (slug !== undefined ? category === slug : false))?.emojis || [];
    } catch (error) {
        return [];
    }
};

const useEmoji = (category: UseEmojiCategory) => {
    const [state, setState] = useState([]);

    useEffect(() => {
        (async () => {
            const state = await getEmoji(category);

            setState(state);
        })();
    }, [category]);

    return state;
};

export default useEmoji;
