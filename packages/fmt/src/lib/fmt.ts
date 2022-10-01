export const delimit = (figure: string | number) :string => {
    try {
        return (figure || '').toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    } catch (error) {
        const parts = (figure || '').toString().split('.');

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }
};

export const truthy = (truthiness: any) : boolean => {
    const datatype = typeof truthiness;

    switch (datatype) {
        case 'string':
            return ['true', 'false'].includes((truthiness).toLowerCase())
                ? JSON.parse(truthiness)
                : ['1', '0'].includes(truthiness)
                    ? parseInt(truthiness) === 1
                    : false;
        case 'number':
            return parseInt(truthiness) === 1;
        case 'boolean':
            return truthiness;
        default:
            return false;
    }
}