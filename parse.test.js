import { parse } from './parse.js'

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

    test('should correctly add a negative and a positive numbers', () => {
      expect(parse('-3 + 2')).toBe(-1)
    })

    test('should correctly subtract a negative and a positive number', () => {
      expect(parse('-3 -  2')).toBe(-5)
    })
  })

  describe('misc tests', () => {
    test('should correctly compute multiple * and / operations', () => {
      expect(parse('2*3/2*5')).toBe(15)
    })
    test('should handle a single positive digit', () => {
      expect(parse('15')).toBe(15)
    })
    test('should handle a single negative digit', () => {
      expect(parse('-15')).toBe(-15)
    })
  })
})
