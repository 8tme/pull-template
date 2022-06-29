const inquirer = require('inquirer')

const options = [
  {
    name: 'vue',
    type: 'checkbox',
    message: 'Check the features needed for your project:',
    choices: [
      {
        name: "Babel",
        checked: true,
      },
      {
        name: "TypeScript",
      },
      {
        name: "Progressive Web App (PWA) Support",
      },
      {
        name: "Router",
      },
    ],
  }
]
async function pickOptions() {
  const answer = await inquirer.prompt(options)
  return answer
}

module.exports = pickOptions
