import { _even, _half } from "./validations";
import { sum, root, numeral, product, quotient, rounding, difference } from "../lib/typings";

/**
 * Get the GCD (Greatest Common Divisor) or HCF (Highest Common Factor) of two numbers
 * i.e largest number that divides both of them.
 * 
 * @param a
 * @param b
 * @returns
 */
export const getHighestCommonFactor = (a: numeral, b:numeral) : number => {
    a = parseInt(a.toString());
    b = parseInt(b.toString());

    let result = Math.min(a, b);

    while (result > 0) {
        if (a % result == 0 && b % result == 0) break;

        result--;
    }

    return result;
}

/**
 * Get the LCM (Least Common Multiple) or LCD (Least Common Divisor) of two numbers
 * i.e smallest number which can be divided by both numbers
 * 
 * NOTE: a x b = LCM(a, b) * GCD (a, b)
 * 
 * @param a
 * @param b
 * @returns
 */
export const getLeastCommonMultiple = (a: numeral, b: numeral) : number => {
    a = parseInt(a.toString());
    b = parseInt(b.toString());

    return (a / getHighestCommonFactor(a, b)) * b;
}

/**
 * 
 * Get the number of decimal places,
 * as an indicator of the level of precision of a given number.
 * 
 * @param x - a numeral
 * @returns 
 */
export const getPrecision = (x : numeral) : number => {
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
export const getResolution = (x : numeral) : number => {
    return Math.pow(10, getPrecision(x));
}

/**
 * Limit decimal places, 
 * to the specified significant figures / digits / precision / resolution
 * 
 * @param figure
 * @param resolution - ie 10, 100, 100, 1000
 * @returns 
 */
export const round = (figure: number, resolution: number) : number => {
    return Math.round((figure + Number.EPSILON) * resolution) / resolution;
}

/**
 * Calculates a number with an approximate value that has a shorter, simpler, 
 * or more explicit representation, of the actual value.
 * 
 * @param {numeral} x
 * @param {number} precision
 * @param {rounding} mode 
 * @returns 
 */
export const roundOff = (x: numeral, precision: number, mode: rounding) : number => {
    const resolution = getResolution(precision);

    switch (mode) {
        case 'UP':
            return Math.ceil(+x);

        case 'DOWN':
            return Math.floor(+x);

        case 'HALF_UP':
            return round(+x, resolution);

        case 'HALF_DOWN':
            return _even(+x) 
                ? Math.floor(+x) 
                : round(+x, resolution)

        case 'HALF_EVEN': {
            const rounded = round(+x, resolution);

            return _half(+x)
                ? _even(rounded) ? rounded : rounded - 1
                : rounded;
        }

        case 'HALF_ODD': {
            const rounded = round(+x, resolution);

            return _half(+x)
                ? _even(rounded) ? rounded - 1 : rounded
                : rounded;
        }

        case 'HALF_TOWARDS_ZERO':
            return _half(+x) 
                ? Math.sign(+x) * Math.floor(Math.abs(+x)) 
                : round(+x, resolution);

        case 'HALF_AWAY_FROM_ZERO':
            return _half(+x) 
                ? Math.sign(+x) * Math.ceil(Math.abs(+x)) 
                : round(+x, resolution);
    }
};

export const addition = (augend: numeral, addend: numeral) : sum => {
    const commonDenominator = getLeastCommonMultiple(getResolution(augend), getResolution(addend));

    const x = Math.round(+augend * commonDenominator);
    const y = Math.round(+addend * commonDenominator);

    return (x + y) / commonDenominator;
}

export const subtraction = (minuend: numeral, subtrahend: numeral) : difference => {
    const commonDenominator = getLeastCommonMultiple(getResolution(minuend), getResolution(subtrahend));

    const x = Math.round(+minuend * commonDenominator);
    const y = Math.round(+subtrahend * commonDenominator);

    return (x - y) / commonDenominator;
};

export const multiplication = (multiplier: numeral, multiplicand: numeral) : product => {
    return +multiplier * +multiplicand;
};

export const division = (dividend: numeral, divisor: numeral) : quotient => {
    return +dividend / +divisor;
};

export const nthroot = (degree: numeral, radicand: numeral) : root => {
    return Math.pow(+degree, 1/(+radicand));
};

export const exponentiation = (base: numeral, exponent: numeral) : product => {
    return Math.pow(+base, +exponent);
};