
const {
  program,
  Option
} = require('commander')
const chalk = require('chalk')

program.name(require('../package.json').command)

console.log(
  chalk.bgGreenBright(`
    This is my ${chalk.bgWhiteBright('first cli')}
  `)
)
console.log(
  chalk.green(
    "I am a green line " +
    chalk.blue.underline.bold("with a blue substring") +
    " that becomes green again!"
  )
)

program
  .command("create <project-name>") // 增加创建指令
  .description("create a new project") // 添加描述信息
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .option("-n,--new", "新建") // 心间
  .action(require('../lib/create.js'))

program.on('--help', () => {
  console.log(`
   run: ${chalk.green('cli create <project-name>')} to create app
  `)
})

  program
  .command("config [value]") // config 命令
  .description("inspect and modify the config")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set option[key] is value")
  .option("-d, --delete <key>", "delete option by key")
  .action((value, keys) => {
    // value 可以取到 [value] 值，keys会获取到命令参数
    console.log(value, keys)
  })



// 解析用户执行时输入的参数
// process.argv 是 nodejs 提供的属性
// npm run server --port 3000
// 后面的 --port 3000 就是用户输入的参数
program
  .name('cli')
  .description(`${chalk.bgGreenBright('第一个自定义的CLI')}`)
  .version(`1.0.0`)
  .usage(`<command> [option]`)
  .addOption(new Option('-v,--version', '查看版本信息'))
  .parse(process.argv)


