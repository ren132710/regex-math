import parse from './parse.js'

describe('#parse', () => {
  describe('multiplication tests', () => {
    test('should correctly multiply two single digit numbers', () => {
      expect(parse('3 * 2')).toBe(6)
    })

    test('should correctly multiply two multi-digit numbers', () => {
      expect(parse('3345 * 10')).toBe(33450)
    })

    test('should correctly multiply two decimal numbers', () => {
      expect(parse('1.2 * 3.4')).toBe(4.08)
      expect(parse('1.2 * .3')).toBe(0.36)
      expect(parse('1.2 * 0.3')).toBe(0.36)
    })

    test('should correctly multiply when many whitespace chars are present', () => {
      expect(parse('3   *       10')).toBe(30)
    })

    test('should correctly multiply when no whitespace chars are present', () => {
      expect(parse('3*10')).toBe(30)
      expect(parse('1.2*3.4')).toBe(4.08)
      expect(parse('1.2*.3')).toBe(0.36)
    })

    test('should correctly multiply multiple numbers in a row', () => {
      expect(parse('12*34*56*78')).toBe(1782144)
      expect(parse('1.2*3.4 * 5.6')).toBe(22.848)
    })
  })

  describe('division tests', () => {
    test('should correctly divide two single digit numbers', () => {
      expect(parse('6 / 5')).toBe(1.2)
    })

    test('should correctly divide multi-digit numbers', () => {
      expect(parse('60/5')).toBe(12)
    })

    test('should correctly divide decimal numbers', () => {
      expect(parse('4.3/2.1')).toBe(2.0476190476190474)
    })

    test('should correctly divide multiple numbers in a row', () => {
      expect(parse('30/5/  2/ 2')).toBe(1.5)
    })

    test('should return infinity when dividing by zero', () => {
      expect(parse('6/0')).toBe(Infinity)
    })
  })

  describe('addition and subtraction tests', () => {
    test('should correctly add two single digit numbers', () => {
      expect(parse('6 + 5')).toBe(11)
    })

    test('should correctly subtract two single digit numbers', () => {
      expect(parse('6 - 5')).toBe(1)
    })

    test('should correctly add and subtract a series of numbers', () => {
      expect(parse('6 - 5+13   - 2 + 3 + 3 - 10')).toBe(8)
    })

    test('should correctly add two negative numbers', () => {
      expect(parse('-3 + -2')).toBe(-5)
    })
    test('should correctly add a negative and a positive number', () => {
      expect(parse('-3 + 2')).toBe(-1)
    })

    test('should correctly subtract two negative numbers', () => {
      expect(parse('-3 -  -2')).toBe(-1)
    })

    test('should correctly subtract a negative and a positive number', () => {
      expect(parse('-3 -  2')).toBe(-5)
    })
  })

  describe('to-the-power-of tests', () => {
    test('should correctly compute positive exponents', () => {
      expect(parse('4 ^ 4')).toBe(256)
      expect(parse('-4 ^ 3')).toBe(-64)
    })

    test('should correctly compute negative exponents', () => {
      expect(parse('4 ^ -4')).toBe(0.00390625)
    })

    test('should ignore fractional exponents', () => {
      expect(parse('4 ^1.2+5')).toBeNaN()
      expect(parse('4^1+.25')).toBe(4.25)
    })
  })

  describe('parentheses tests', () => {
    test('should correctly compute an equation with nested parentheses', () => {
      expect(parse('2 +  ((3*4)/(7+5))')).toBe(3)
    })
  })

  describe('edge cases', () => {
    test('should correctly compute multiple operations in sequence', () => {
      expect(parse('-2*3/2*5+2-3-     -1')).toBe(-15)
    })

    test('should handle a single positive digit', () => {
      expect(parse('15')).toBe(15)
    })

    test('should handle a single negative digit', () => {
      expect(parse('-15')).toBe(-15)
    })

    test('should handle very large numbers with scientific notation', () => {
      expect(parse('10 ^ 30')).toBe(1e30)
    })

    test('should handle very small numbers with scientific notation', () => {
      expect(parse('10 ^ -30')).toBe(1e-30)
    })

    test('should return NaN when entry is not valid', () => {
      expect(parse('abc')).toBeNaN()
      expect(parse('1+2*sdfsdf')).toBeNaN()
      expect(parse('3*2=6')).toBeNaN()
    })
  })
})
