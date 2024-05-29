export default (obj: unknown): string => {
    // handle null
    if (obj === null) return 'null';

    // handle undefined
    if (obj === undefined) return 'undefined';

    // handle typeof NaN === 'number' being truthy
    if (typeof obj === 'number') return isNaN(obj) ? 'NaN' : 'Number';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
};
