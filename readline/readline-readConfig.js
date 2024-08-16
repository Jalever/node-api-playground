const chalk = require('chalk')
const {readFileSync} = require('node:fs')
const {Command} = require('commander')

const program = new Command()

function log () {
  console.log(...arguments)
}

function readConfig () {
  let data = ''
  try {
    const targetFilePath = './input.txt'
    const config = {
      encoding: 'utf-8'
    }
    data = readFileSync(targetFilePath, config)
  } catch (error) {
    const text = `读取文件失败, 请检查是否有 ${chalk.blue(
          "input.txt"
        )} 文件， 没有请运行 ${chalk.green("node fs-createWriteStream")} 命令`
    log(text)
  }
  return data
}

program
  .command('test')
  .description('测试一些函数')
  .action(() => {
    log(`program command action run:`)
    const config = readConfig()
    log(chalk.blue(`success.\n`), config)
  })
program.parse()
