const inquirer = require('inquirer')
const { getRegInfo } = require('./fetch')

module.exports = async function () {
  const repoList = await getRegInfo()
  const repos = repoList.map((item) => item.name)
  let { repo } = await new inquirer.prompt([
    {
      name: "repo",
      type: "list",
      message: "Please choose a template",
      choices: repos,
    },
  ])

  return repo
}