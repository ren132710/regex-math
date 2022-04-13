/*
 * uses regex groups for match destructuring
 * parentheses: between parentheses, match any character except parentheses
 * exponent: matches positive and negative exponents, not fractional exponents
 * +,-,*,/: matches negative and decimal numbers
 */

const PARENTHESES_REGEX = /\((?<equation>[^\(\)]*)\)/
const EXPONENT_REGEX = /(?<operand1>-?\d*\.?\d+)\s*(?<operation>\^)\s*(?<operand2>-?\d+)/
const MULTIPLY_DIVIDE_REGEX = /(?<operand1>-?\d*\.?\d+)\s*(?<operation>[\*\/])\s*(?<operand2>-?\d*\.?\d+)/
const ADD_SUBTRACT_REGEX = /(?<operand1>-?\d*\.?\d+)\s*(?<operation>[-\+])\s*(?<operand2>-?\d*\.?\d+)/

export default function parse(equation) {
  if (equation.match(PARENTHESES_REGEX)) {
    const subEquation = equation.match(PARENTHESES_REGEX).groups.equation
    const result = parse(subEquation)
    const newEquation = equation.replace(PARENTHESES_REGEX, result)
    return parse(newEquation)
  } else if (equation.match(EXPONENT_REGEX)) {
    const result = doMath(equation.match(EXPONENT_REGEX).groups)
    const newEquation = equation.replace(EXPONENT_REGEX, result)
    return parse(newEquation)
  } else if (equation.match(MULTIPLY_DIVIDE_REGEX)) {
    const result = doMath(equation.match(MULTIPLY_DIVIDE_REGEX).groups)
    const newEquation = equation.replace(MULTIPLY_DIVIDE_REGEX, result)
    return parse(newEquation)
  } else if (equation.match(ADD_SUBTRACT_REGEX)) {
    const result = doMath(equation.match(ADD_SUBTRACT_REGEX).groups)
    const newEquation = equation.replace(ADD_SUBTRACT_REGEX, result)
    return parse(newEquation)
  } else if (isNaN(equation)) {
    return NaN
  } else {
    return parseFloat(equation)
  }
}

function doMath({ operand1, operand2, operation }) {
  const num1 = parseFloat(operand1)
  const num2 = parseFloat(operand2)

  switch (operation) {
    case '*':
      return num1 * num2
    case '/':
      return num1 / num2
    case '+':
      return num1 + num2
    case '-':
      return num1 - num2
    case '^':
      return num1 ** num2
  }
}
