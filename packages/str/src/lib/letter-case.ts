const TILE_CASE_EXCEPTIONS = [
    // articles
    'a', 'an', 'the',
    // conjuctions
    "and" , "as" , "but" , "for" , "if" , "nor" , "once" , "or" , "so" , "than" , "that" , "till" , "when" , "yet",
    // prepositions
    'at' , 'by' , 'down' , 'for' , 'from' , 'in' , 'into' , 'like' , 'near' , "of" , "off" , "on" , "onto" , "over" , 'past' , 'to' , 'upon' , 'with'
];

const str = (value: any): string => {
    return typeof value === "string" ? value : "";
}

export const toLabel = (value: string) : string => {
    return (value).toString()
        .normalize( 'NFD' )
        .replace( /[\u0300-\u036f]/g, '' ) // remove accents
        .toLowerCase()
        .trim()
        .replace(/--+/g, '-') // replaces multiple hyphens by one hyphen
        .replace(/(^-+|-+$)/g, '') // remove extra hyphens from beginning or end of the string
        .replace(/([^\w]+|\s+)/g, '-'); // replace space and other characters by hyphen except for alpha-numeric characters
}

export const toLower = (value : string, locale = false) : string => {
    return value[locale ? 'toLocaleLowerCase' : 'toLowerCase']();
}
export const toUpper = (value : string, locale = false) : string => {
    return value[locale ? 'toLocaleUpperCase' : 'toUpperCase']();
}

export const toKebab = (value : string, locale = false) : string => {
    return (value.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) ?? [])
        .map(token => toLower(token, locale))
        .join('-');
}

export const toSnake = (value : string, locale = false) : string => {
    return (value.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) ?? [])
        .map(token => toLower(token, locale))
        .join('_');
}

export const toCamel = (value : string, locale = false) : string => {
        return (value.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) ?? [])
            .reduce((acc, val, idx) => {
                return idx !== 0
                    ? `${acc}${toUpper(val.charAt(0), locale)}${toLower(val.slice(1), locale)}`
                    : `${acc}${toLower(val, locale)}`;
            }, '');
}

export const toStart = (value: string, locale = false) : string => {
    return value.split(/\s/g)
            .reduce((acc, val) => {
                return acc 
                    + "\u00A0"
                    + `${toUpper(val.charAt(0), locale)}${toLower(val.slice(1), locale)}`;
            }, '');
}

export const toTitle = (value: string, locale = false, exclude: Array<string> = []) : string => {
    const ignore = [...TILE_CASE_EXCEPTIONS, ...exclude];

    return value.split(/\s/g)
            .reduce((acc, val) => {
                return acc
                + "\u00A0"
                + ignore.includes(val) 
                    ? toLower(val, locale)
                    : `${toUpper(val.charAt(0), locale)}${toLower(val.slice(1), locale)}`;
            }, '');
}

export default str;