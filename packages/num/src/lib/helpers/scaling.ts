import { numeric } from "../typings";

/**
 * 
 * Get the number of decimal places,
 * as an indicator of the level of precision of a given number.
 * 
 * @param x - a numeric
 * @returns 
 */
const precision = (x : numeric) : number => {
    const value = x.toString();

    // eslint-disable-next-line no-unused-vars
    const [_, fraction] = value.indexOf('e-') > 0
        ? value.split('e-')
        : value.split('.');

    return fraction ? fraction.length : 0;
};

/**
 * 
 * Get the factor of 10 i.e 10th, 100th, 1000th,
 * from the number of decimal places in a given number.
 * 
 * @param x - the precision or number of decimal places
 * @returns 
 */
const resolution = (x : numeric) : number => {
    return Math.pow(10, precision(x));
}

export default {
    precision,
    resolution
}