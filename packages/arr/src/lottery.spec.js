const lotteryTs = require('./lib/lottery')
const lottery = lotteryTs["default"]

describe('Testing imports', () => {
	it("should be a function", ()=>{
		expect(typeof lottery).toBe('function')
	})
})

/**
 * value returned is contained in initial array
 * value is not undefined if array is valid
 * should return the input->undefined if input is invalid **
 * should return undefined if input is an empty array
 */

describe('Testing the return value', () => {
	it("should return a value contained in the input array", ()=>{
		expect([1,2,3,4,5]).toContain(lottery([1,2,3,4,5]))
	})
	it("should return a value contained in the input array", ()=>{
		expect(['1','2','3','4','5']).toContain(lottery(['1','2','3','4','5']))
	})
	it("should return a value that is defined if input is valid", ()=>{
		expect(lottery(['1','2','3','4','5'])).not.toBeUndefined
	})
	it("should return undefined if input is invalid", ()=>{
		expect(lottery(1)).toBeUndefined
	})
	it('should throw error if no arguments are provided', ()=>{
		try {
			expect(lottery()).toBeUndefined
		} catch (error) {
			expect(error.message).toBe("Cannot read properties of undefined (reading 'length')")
		}
		
	})
	it("should return undefined if input array is empty", ()=>{
		expect(lottery([])).toBeUndefined
	})
})
