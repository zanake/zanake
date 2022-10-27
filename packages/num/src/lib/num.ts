import { numeral } from './typings';
import { addition, division, subtraction, multiplication, roundOff } from '../utils/arithmetics';

export class Money {
    #amount: number;
    #currency: string;
    #precision: number;

    constructor(currency: string, amount: numeral, precision = 2) {
        this.#currency = currency;

        this.#amount = +amount || 0;

        this.#precision = precision;
    }

    // format(value: string | number): string {
    //     try {
    //         return (value || '').toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    //     } catch (error) {
    //         const parts = (value || '').toString().split('.');

    //         parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //         return parts.join('.');
    //     }
    // }

    // toString() : string {
    //     return delimit(this.#amount);
    // }

    plus(...x: Array<numeral>): Money {
        const sum = x.reduce((result, y) => addition(result, +y), this.#amount);

        return new Money(this.#currency, sum, this.#precision);
    }

    minus(...x: Array<numeral>): Money {
        const difference = x.reduce((result, y) => subtraction(result, +y), this.#amount);

        return new Money(this.#currency, difference, this.#precision);
    }

    times(...x: Array<numeral>): Money {
        const product = x.reduce((result, y) => multiplication(result, +y), this.#amount);

        return new Money(this.#currency, product, this.#precision);
    }

    divide(...x: Array<numeral>): Money {
        const quotient = x.reduce((result, y) => division(result, +y), this.#amount);

        return new Money(this.#currency, quotient, this.#precision);
    }

    allocate(ratio: Array<numeral>): Array<Money> {
        const commonFactor = division(
            100,
            ratio.reduce((a, b) => +a + +b)
        );

        return ratio.map((x, i) => {
            const percentage = multiplication(commonFactor, x);
            const allocation = division(multiplication(this.#amount, percentage), 100);

            const amount =
                i % 2 == 0
                    ? roundOff(allocation, this.#precision, 'UP')
                    : roundOff(allocation, this.#precision, 'DOWN');

            return new Money(this.#currency, amount, this.#precision);
        });
    }
}
