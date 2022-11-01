export default (value: any) : boolean => {
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