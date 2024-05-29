export const isObj = (value: unknown): boolean => {
    return typeof value === 'object' && !Array.isArray(value) && value !== null;
};

export const plainObj = (value: unknown): boolean => {
    if (!value || toString.call(value) !== '[object Object]') return false;

    const proto = Object.getPrototypeOf(value);

    // Objects created with `Object.create( null )` have no prototype but are valid objects
    if (!proto) return true;

    // Objects with prototype are plain iff they were constructed by a global Object function
    const ctor = {}.hasOwnProperty.call(proto, 'constructor') && proto.constructor;

    return (
        typeof ctor === 'function' && {}.hasOwnProperty.toString.call(ctor) === {}.hasOwnProperty.toString.call(Object)
    );
};

export const partialObj = (
    value: Record<string, unknown>,
    action: 'omit' | 'pick',
    ...keys: string[]
): Record<string, unknown> => {
    if (!keys.length) return value;

    switch (action) {
        case 'omit':
            return Object.keys(value).reduce((obj, key) => {
                return keys.includes(key) ? obj : { ...obj, [key]: value[key] };
            }, {});

        case 'pick':
            return keys.reduce((obj, key) => {
                return { ...obj, [key]: value[key] };
            }, {});
    }
};
