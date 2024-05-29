import { isObj, plainObj, partialObj } from './obj';

describe(`isObj function`, () => {
    describe('Checks if the value is an object', () => {
        const predictions = [
            { label: 'when given a string', input: '', output: false },
            { label: 'when given a null', input: null, output: false },
            { label: 'when given an object', input: {}, output: true },
            { label: 'when given a number', input: 100, output: false },
            { label: 'when given a boolean', input: false, output: false },
            { label: 'when given an empty array', input: [], output: false },
            { label: 'when given an non-empty array', input: NaN, output: false },
            { label: 'when given zero arguments', input: undefined, output: false },
            { label: 'when given an instance of a class', input: new Date(), output: true },
        ];

        predictions.forEach(({ label, input, output }) => {
            test(label, () => {
                expect(isObj(input)).toBe(output);
            });
        });
    });
});

describe(`plainObj function`, () => {
    describe('Checks if the value is a plain object', () => {
        const predictions = [
            { label: 'when given an object', input: {}, output: true },
            { label: 'when given an instance of a class i.e Date', input: new Date(), output: false },
            { label: 'when given an object create by Object.create(null)', input: Object.create(null), output: true },
        ];

        predictions.forEach(({ label, input, output }) => {
            test(label, () => {
                expect(plainObj(input)).toBe(output);
            });
        });
    });
});

describe(`partialObj function`, () => {
    describe('Cherry picks object fields & returns a new Object', () => {
        describe('`omit` flag', () => {
            const input = { begin: 'abc', end: 'xyz' };

            test('omits specified fields', () => {
                expect(partialObj(input, 'omit', 'begin', 'end')).toStrictEqual({});
            });

            test('retains all fields when no fields are specified', () => {
                expect(partialObj(input, 'omit')).toStrictEqual(input);
            });
        });

        describe('`pick` flag', () => {
            const input = { start: 'abc', middle: 'mn', finish: 'xyz' };

            test('retain specified fields excluding the rest', () => {
                expect(partialObj(input, 'pick', 'start', 'finish')).toStrictEqual({
                    start: 'abc',
                    finish: 'xyz',
                });
            });

            test('retains all fields when no fields are specified', () => {
                expect(partialObj(input, 'omit')).toStrictEqual(input);
            });
        });
    });
});
