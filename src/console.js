const chalk = require('chalk');

const originalConsole = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
};

function getDateTimePrefix() {
  const datetime = new Date();
  const day = datetime.getDate().toString().padStart(2, '0');
  const month = (datetime.getMonth() + 1).toString().padStart(2, '0');
  const hour = datetime.getHours().toString().padStart(2, '0');
  const minute = datetime.getMinutes().toString().padStart(2, '0');
  return `[${day}-${month}-${datetime.getFullYear().toString().slice(-2)} ${hour}:${minute}]`;
}

function log(...args) {
  const prefix = getDateTimePrefix();
  originalConsole.log(chalk.dim(prefix), ...args);
}

function info(...args) {
  const prefix = getDateTimePrefix();
  originalConsole.log(chalk.cyan(prefix), ...args);
}

function warn(...args) {
  const prefix = getDateTimePrefix();
  originalConsole.log(chalk.yellow(prefix), ...args);
}

function error(...args) {
  const prefix = getDateTimePrefix();
  originalConsole.log(chalk.red(prefix), ...args);
}

// Replace original console methods
console.log = log;
console.info = info;
console.warn = warn;
console.error = error;