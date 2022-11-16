import { numeric } from './typings';
import { _even, _half } from './helpers';

/**
 * Get the GCD (Greatest Common Divisor) or HCF (Highest Common Factor) of two numbers
 * i.e largest number that divides both of them.
 *
 * @param a
 * @param b
 * @returns
 */
export const getHighestCommonFactor = (a: numeric, b: numeric): number => {
    a = parseInt(a.toString());
    b = parseInt(b.toString());

    let result = Math.min(a, b);

    while (result > 0) {
        if (a % result == 0 && b % result == 0) break;

        result--;
    }

    return result;
};

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
export const getLeastCommonMultiple = (a: numeric, b: numeric): number => {
    a = parseInt(a.toString());
    b = parseInt(b.toString());

    return (a / getHighestCommonFactor(a, b)) * b;
};
