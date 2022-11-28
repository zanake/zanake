const shuffleTs = require('./lib/shuffle');
const shuffle = shuffleTs["default"];

describe('Check for values in the array', () => {
	let array1 = [1,2,3,4,5,6,7]
	let array2 = [7,6,5,4,3,2,1]
	let shuffled1 = shuffle([...array1])
	it('returns an array of the same length', () => {
		expect(shuffle(array1).length).toBe(array1.length)
	})
	it('returns an array of the same length', () => {
		expect(shuffle(array2).length).toBe(array2.length)
	})
	it('returns a shuffled array', () => {
		expect(shuffled1[0] + shuffled1[1]).not.toEqual(array1[0] + array1[1])
	})
})
describe('Accounting for invalid inputs', () => {
	it('should throw error if no arguments are provided', ()=>{
		try {
			expect(shuffle()).toBeUndefined
		} catch (error) {
			expect(error.message).toBe("Cannot read properties of undefined (reading 'length')")
		}
		
	})
	it('should return empty array if input is empty array', () => {
		expect(shuffle([])).toEqual([])
	})
	it('should throw error if invalid arguments are provided', ()=>{
		try {
			expect(shuffle(33345)).toBeUndefined
		} catch (error) {
			expect(error.message).toBe("Cannot read properties of undefined (reading 'length')")
		}
		
	})
	it('should throw readonly error if input is string', () => {
		try {
			expect(shuffle('33345')).toBeUndefined
		} catch (error) {
			expect(error.message).toBe("Cannot assign to read only property '4' of string '33345'")
		}
	})
})
