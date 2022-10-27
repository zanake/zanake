import { Money } from './num';

describe('Floating point arithmetcis', () => {
    describe('Adds a given set of numbers to the provided money', () => {
        const cases = [
            {start: 0, input: [0.1, 0.2], output: `0.30`},
            {start: 0, input: [1.1, 1.1, 1.1, 4], output: `7.30`},
        ];

        cases.forEach((variation) => {
            const {start, input, output} = variation;
            test(`add ${JSON.stringify(input)} to ${start} to get ${output}`, () => {
                expect(new Money('KES', start).plus(...input).figure).toBe(output);
            });
        });
    });

    describe('Subtracts a given set of numbers from the provided money', () => {
        const cases = [
            {start: 1, input: [0.3, 0.4], output: `0.30`},
        ];

        cases.forEach((variation) => {
            const {start, input, output} = variation;
            test(`subtract ${JSON.stringify(input)} from ${start} to get ${output}`, () => {
                expect(new Money('KES', start).minus(...input).figure).toBe(output);
            });
        });
    });

    describe('Mulitplies the provided money by a given factor', () => {
        const cases = [
            {start: {amount: 2090.5, precision: 3}, input: 8.61, output: `17999.205`},
            {start: {amount: 2090.5}, input: 8.61, output: `17999.21`},
            {start: {amount: 209050}, input: 8.61, output: `1799920.50`},
        ];

        cases.forEach((variation) => {
            const {start, input, output} = variation;
            const amt = new Money('KES', start.amount, start.precision);

            test(`multiply ${amt.figure} by ${input} to get ${output}`, () => {
                expect(amt.times(input).figure).toBe(output);
            });
        });
    });

    describe('Divides the provided money by a given divisor', () => {
        const cases = [
            {start: 1.21, input: 0.1, output: `12.10`},
            {start: 0.2, input: 0.1, output: `2.00`},
            {start: 0.2, input: 3, output: `0.07`},
            {start: 0.3, input: 3, output: `0.10`},
        ];

        cases.forEach((variation) => {
            const {start, input, output} = variation;
            const amt = new Money('KES', start);

            test(`divide ${amt.figure} by ${input} to get ${output}`, () => {
                expect(amt.divide(input).figure).toBe(output);
            });
        });
    });

    describe('Allocates the provided money by the given percentage ratio', () => {
        const cases = [
            {start: 500, input: [3, 2], output: [`300.00`, `200.00`]},
            {start: 500, input: [1, 1, 1], output: [`166.67`, `166.67`, `166.66`]},
            {start: 500, input: [0, 1, 1], output: [`0.00`, `250.00`, `250.00`]},
        ];

        cases.forEach((variation) => {
            const {start, input, output} = variation;
            const amt = new Money('KES', start);
            test(`allocate ${amt.figure} by the ratio {${input}} to get {${output}}`, () => {
                expect(amt.allocate(input).map((x) => x.figure).sort()).toEqual(output.sort());
            });
        });
    });

    describe('Formats figures with comma separators for thousands place holder', () => {
        const cases = [
            {input: 0, precision: 0, output: '0'},
            {input: 0.123456, precision: 6, output: '0.123456'},

            {input: 100, precision: 0, output: '100'},
            {input: 100.123456, precision: 6, output: '100.123456'},

            {input: 1000, precision: 0, output: '1,000'},
            {input: 1000.123456, precision: 6, output: '1,000.123456'},

            {input: 10000, precision: 0, output: '10,000'},
            {input: 10000.123456, precision: 6, output: '10,000.123456'},

            {input: 100000, precision: 0, output: '100,000'},
            {input: 100000.123456, precision: 6, output: '100,000.123456'},

            {input: 1000000, precision: 0, output: '1,000,000'},
            {input: 1000000.123456, precision: 6, output: '1,000,000.123456'},

            {input: 10000000, precision: 0, output: '10,000,000'},
            {input: 10000000.123456, precision: 6, output: '10,000,000.123456'},
        ];

        cases.forEach((variation) => {
            const {input, precision, output} = variation;
            const amt = new Money('KES', input, precision, true);

            test(`formats ${amt.figure} with comma separators to get ${output}`, () => {
                expect(amt.figure).toBe(output);
            });
        });
    });
});
