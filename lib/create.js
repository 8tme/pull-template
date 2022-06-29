const path = require('path')
const fs = require('fs-extra')
const ora = require('ora')
const inquirer = require('inquirer')
const pickOptions = require('./options')
const pickTemplate = require('./template')
const pickVersion = require('./version')

const fileSpinner = ora('Loading mking file !!!')

async function mkFile (url) {
  const repo = await pickTemplate()
  const version = await pickVersion(repo)
  // const answer = await pickOptions()
  fileSpinner.start()
  await require('util').promisify(require('download-git-repo'))(
    `8tme/${repo}/#${version}`,
    url
  )
  fileSpinner.text = 'mkfile === succeed'
  fileSpinner.succeed()
  // await fs.mkdir(url)
  // await fs.writeFile(
  //   path.join(url, 'a.txt'),
  //   JSON.stringify(answer)
  // )
  // fileSpinner.text = 'loaded === succeed'
  // fileSpinner.succeed()
}

async function removeOrigin (url) {
  await fs.remove(url)
}

module.exports = async function (name, options) {
  // 文件是否存在
  const url = path.join(process.cwd(), name)
  const exist = fs.existsSync(url)

  // 新建
  if (options?.force) {
    await removeOrigin(url)
    mkFile(url)
    return
  }

  // 文件不存在
  if (!exist) {
    mkFile(url)
    return
  }

  // 文件已经存在
  const answer = await inquirer.prompt({
    name: 'cover',
    type: 'confirm',
    message: '文件已经存在是否覆盖？',
  })
  // 覆盖
  if (answer.cover) {
    await removeOrigin(url)
    mkFile(url)
  }
}