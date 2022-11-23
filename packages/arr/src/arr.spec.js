const arrTs = require('./lib/arr')
const arr = arrTs['default']

/* return value is an array */
describe('Does the function return an array?', () => {
	test('when checked with Array.isArray', () => {
		expect(Array.isArray(arr())).toBe(true)
	})
	test('when checked with typeof', () => {
		expect(typeof arr()).toBe('object')
	})
	test('when checked with length property', ()=>{
		expect(arr().length).toBeGreaterThanOrEqual(0)
	})
	test('when checked with length property', ()=>{
		expect(arr([1,2,3,4]).length).toStrictEqual(4)
	})
})

/* default values */
describe('Does it behave correctly when given "correct" values?', () => {
	test('when given an array of numbers', ()=>{
		expect(arr([1,2,3,4,5,1,2])).toStrictEqual([1,2,3,4,5,1,2])
	})
	test('when given an array of strings', ()=>{
		expect(arr(['a', 'ab', 'apple', 'zylophone', 'xenon'])).toStrictEqual(['a', 'ab', 'apple', 'zylophone', 'xenon'])
	})
	test('when given an array of arrays', ()=>{
		expect(arr([[], [], []]).length).toStrictEqual(3)
	})
	
})

/* wrong input */
describe('Does it behave correctly when given "wrong" values?', () => {
	describe('When handling numbers', () => {
		test('when passed 0 as an argument', () => {
			expect(arr(0)).toStrictEqual([])
		})
		test('when passed a number as an argument', () => {
			expect(arr(897)).toStrictEqual([])
		})
	})

	describe('When handling strings', () => {
		test('when passed a string as an argument', () => {
			expect(arr('Hello')).toStrictEqual([])
		})
		test('when passed an empty string as an argument', () => {
			expect(arr('')).toStrictEqual([])
		})
	})

	describe('When handling booleans', () => {
		test('when passed false as an argument', () => {
			expect(arr(false)).toStrictEqual([])
		})
		test('when passed true as an argument', () => {
			expect(arr(true)).toStrictEqual([])
		})
	})

	describe('When handling other falsy values', () => {
		test('when passed null as an argument', () => {
			expect(arr(null)).toStrictEqual([])
		})
		test('when passed undefined as an argument', () => {
			expect(arr(undefined)).toStrictEqual([])
		})
		test('when passed NaN as an argument', () => {
			expect(arr(NaN)).toStrictEqual([])
		})
	})

	describe('When passed multiple arguments should return results of the first argument', () => {
		test('when invoked with multiple arguments', () => {
			expect(arr([1,2,3], ['a', 'b', 'c'])).toStrictEqual([1,2,3])
		})
		test('when invoked with multiple arguments', () => {
			expect(arr([1,2,3], ['a', 'b', 'c'], [7, 34, 2])).toStrictEqual([1,2,3])
		})
	})
})

/* empty input */
describe('Does it behave correctly when left empty?', () => {
	test('when passed an empty array', () => {
		expect(arr([])).toStrictEqual([])
	})
	test('when invoked with no argument', () => {
		expect(arr()).toStrictEqual([])
	})
})
