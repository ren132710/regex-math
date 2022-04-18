import solve from './parse.js'

const equation = document.querySelector('#equation')
const answer = document.querySelector('#answer')
const form = document.querySelector('#equation-form')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const result = solve(equation.value)
  answer.textContent = result
})
