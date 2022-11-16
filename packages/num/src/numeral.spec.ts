import { numeral } from './index';

const PLANCK_CONSTANT = 6.63 * Math.pow(10, -34);
const AVAGADRO_CONSTANT = 6.02 * Math.pow(10, 23);
const LARGEST_SIXTY_FOUR_BIT_INT = `9223372036854775807`;
const SMALLEST_SIXTY_FOUR_BIT_INT = `-9223372036854775808`;

// 1. Observation
describe('numeral function', () => {
    // 2. Question
    describe('Does it format a numerals to a human friendly string?', () => {
        // input & desired outputs (in case you'll iterate)

        // 3. Hypothesis & prediction
        test('When given whole numbers (integers)', () => {
            // 4. Tests
            expect(numeral(LARGEST_SIXTY_FOUR_BIT_INT)).toBe('9,223,372,036,854,775,807');
            expect(numeral(SMALLEST_SIXTY_FOUR_BIT_INT)).toBe('-9,223,372,036,854,775,808');
        });

        test('When given fractional numbers (deciamls | floats)', () => {
            // 4. Tests
            expect(numeral(PLANCK_CONSTANT)).toBe('9,223,372,036,854,775,807');
            expect(numeral(AVAGADRO_CONSTANT)).toBe('-9,223,372,036,854,775,808');
        });
    });
});
