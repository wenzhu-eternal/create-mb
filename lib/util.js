const chalk = require('chalk')

module.exports = {
  succeed: (...message) => {
    console.log(chalk.greenBright.bold(message));
  },
  info: (...message) => {
    console.info(chalk.blueBright.bold(message))
  },
  error: (...message) => {
    console.error(chalk.redBright.bold(message));
  },
}