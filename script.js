import { parse } from './parse.js'

const equation = document.querySelector('#equation')
const answer = document.querySelector('#answer')
const form = document.querySelector('#equation-form')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const result = parse(equation.value)
  answer.textContent = new Intl.NumberFormat().format(result)
})
