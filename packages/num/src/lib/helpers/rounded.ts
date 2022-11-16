import scaling from './scaling';
import { _even, _half } from './index';
import { numeric, rounding } from '../typings';

/**
 * Limit decimal places,
 * to the specified significant figures / digits / precision / resolution
 *
 * @param figure
 * @param resolution - ie 10, 100, 100, 1000
 * @returns
 */
export const round = (figure: number, resolution: number): number => {
    return Math.round((figure + Number.EPSILON) * resolution) / resolution;
};

/**
 * Calculates a number with an approximate value that has a shorter, simpler,
 * or more explicit representation, of the actual value.
 *
 * @param {numeric} x
 * @param {number} precision
 * @param {rounding} mode
 * @returns
 */
export default (x: numeric, precision: number, mode: rounding): number => {
    const resolution = scaling.resolution(precision);

    switch (mode) {
        case 'UP':
            return Math.ceil(+x);

        case 'DOWN':
            return Math.floor(+x);

        case 'HALF_UP':
            return round(+x, resolution);

        case 'HALF_DOWN':
            return _even(+x) ? Math.floor(+x) : round(+x, resolution);

        case 'HALF_EVEN': {
            const rounded = round(+x, resolution);

            return _half(+x) ? (_even(rounded) ? rounded : rounded - 1) : rounded;
        }

        case 'HALF_ODD': {
            const rounded = round(+x, resolution);

            return _half(+x) ? (_even(rounded) ? rounded - 1 : rounded) : rounded;
        }

        case 'HALF_TOWARDS_ZERO':
            return _half(+x) ? Math.sign(+x) * Math.floor(Math.abs(+x)) : round(+x, resolution);

        case 'HALF_AWAY_FROM_ZERO':
            return _half(+x) ? Math.sign(+x) * Math.ceil(Math.abs(+x)) : round(+x, resolution);
    }
};
