const inquirer = require('inquirer')
const { getRegVersion } = require('./fetch')

// 获取版本信息及用户选择的版本
module.exports = async function (repo) {
  let tagList = await getRegVersion(repo)
  const tags = tagList.map((item) => item.name)
  // 选取模板信息
  let { version } = await new inquirer.prompt([
    {
      name: 'version',
      type: 'list',
      message: 'Please choose a version',
      choices: tags,
    },
  ])

  return version
}
