export const lottery = (value: Array<unknown>): unknown => {
    const index = Math.floor(Math.random() * value.length);
    return value[index];
};

export const shuffle = (arr: Array<unknown>): Array<unknown> => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr;
};
