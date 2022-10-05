export const delimit = (value: string | number) :string => {
    try {
        return (value || '').toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    } catch (error) {
        const parts = (value || '').toString().split('.');

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }
};

export const mask = (value: string | number, count: number, start: 'left' | 'right' = 'left', placeholder = '*') : string => {
    const str = value.toString();

    const size = str.toString().length;

    const leftToRight = start === 'left';

    const [begin, end] = leftToRight ? [count, size] : [0, size - count];

    const masked = (placeholder).repeat(count);
    const plaintext = str.substring(begin, end);

    return leftToRight ? masked + plaintext : plaintext + masked;
}

export const truthy = (value: any) : boolean => {
    const datatype = typeof value;

    switch (datatype) {
        case 'string':
            return ['true', 'false'].includes((value).toLowerCase())
                ? JSON.parse(value)
                : ['1', '0'].includes(value)
                    ? parseInt(value) === 1
                    : false;
        case 'number':
            return parseInt(value) === 1;
        case 'boolean':
            return value;
        default:
            return false;
    }
}