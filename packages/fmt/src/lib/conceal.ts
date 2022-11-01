export default (value: string | number, count: number, start: 'left' | 'right' = 'left', placeholder = '*') : string => {
    const str = value.toString();

    const size = str.toString().length;

    const leftToRight = start === 'left';

    const [begin, end] = leftToRight ? [count, size] : [0, size - count];

    const masked = (placeholder).repeat(count);
    const plaintext = str.substring(begin, end);

    return leftToRight ? masked + plaintext : plaintext + masked;
}

