export default (obj) => {
    // handle null
    if (obj === null) return 'null';

    // handle undefined
    if (obj === undefined) return 'undefined';

    // handle typeof NaN === 'number' being truthy
    if (typeof obj === 'number') return isNaN(obj) ? 'NaN' : 'Number';

    return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
};
