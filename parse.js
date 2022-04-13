//use regex groups to destructure the match
// const MULTIPLY_DIVIDE_REGEX = /(?<operand1>\d*\.?\d*)\s*(?<operation>[\*\/])\s*(?<operand2>\d*\.?\d*)/
// const ADD_SUBTRACT_REGEX = /(?<operand1>\d*\.?\d*)\s*(?<operation>[-\+])\s*(?<operand2>\d*\.?\d*)/
// const MULTIPLY_DIVIDE_REGEX = /(?<operand1>\S+)\s*(?<operation>[\*\/])\s*(?<operand2>\S+)/
// const ADD_SUBTRACT_REGEX = /(?<operand1>\S+)\s*(?<operation>[-\+])\s*(?<operand2>\S+)/
const MULTIPLY_DIVIDE_REGEX = /(?<operand1>-?\d*\.?\d+)\s*(?<operation>[\*\/])\s*(?<operand2>-?\d*\.?\d+)/
const ADD_SUBTRACT_REGEX = /(?<operand1>-?\d*\.?\d+)\s*(?<operation>[-\+])\s*(?<operand2>-?\d*\.?\d+)/

// let eq = '6+1-7'
// result = eq.match(ADD_SUBTRACT_REGEX)
// console.log(result)

export function parse(equation) {
  // console.log(equation)
  if (equation.match(MULTIPLY_DIVIDE_REGEX)) {
    const result = doMath(equation.match(MULTIPLY_DIVIDE_REGEX).groups)
    const newEquation = equation.replace(MULTIPLY_DIVIDE_REGEX, result)
    return parse(newEquation)
  } else if (equation.match(ADD_SUBTRACT_REGEX)) {
    const result = doMath(equation.match(ADD_SUBTRACT_REGEX).groups)
    const newEquation = equation.replace(ADD_SUBTRACT_REGEX, result)
    console.log(`newEquation: ${newEquation}`)
    return parse(newEquation)
  } else {
    return parseFloat(equation)
  }
}

function doMath({ operand1, operand2, operation }) {
  console.log(`operand1: ${operand1}`)
  console.log(`operand2: ${operand2}`)
  console.log(`operation: ${operation}`)

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
  }
}
