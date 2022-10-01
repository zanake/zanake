const arr = (value: any) : Array<any> => {
    return Array.isArray(value) ? value : [];
}

export const lottery = (value: Array<any>) : any => {
    const index = Math.floor(Math.random() * value.length)
    return value[index];
}

export const shuffle = (value: Array<any>) : Array<any> => {
    const sequence = [...arr(value)];

    for (let i = sequence.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = sequence[i];
        sequence[i] = sequence[j];
        sequence[j] = temp;
    }

    return sequence;
}

export default arr;