const fs = require('fs');
const shelljs = require("shelljs");
const inquirer = require("inquirer");
const { succeed, error } = require("./util");

const chooseLibrary = async () => {
  return await inquirer.prompt({
    name: 'library',
    type: 'list',
    message: '🤓 Which library do you want to use?',
    choices: ['mbs', 'mbss'],
    default: 'mbs',
  });
}

const cloneLibrary = ({ args, cwd, library }) => {
  shelljs.cd(cwd);

  const githubUrl = {
    mbs: 'https://github.com/wenzhu-eternal/mbs',
    mbss: 'https://github.com/wenzhu-eternal/mbss',
  }

  if (shelljs.exec(`git clone --depth=1 ${args.branch ? `--branch=${args.branch}` : ''} ${githubUrl[library]} .`).code !== 0) {
    error('> clone 项目失败');
    process.exit(1);
  }
  succeed('🚚 clone 成功');
}

const revisePackage = ({ name, cwd, library }) => {
  const packageJsonPath = `${cwd}/package.json`;
  const pkg = require(packageJsonPath);
  const projectPkg = {
    ...pkg,
    name,
    version: '1.0.0',
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(projectPkg, null, 2));

  succeed('🚚 修改 package.json 成功');
}

const command = async config => {
  const { name, args, cwd = process.cwd() } = config;
  const { library } = await chooseLibrary();

  if (name) {
    shelljs.mkdir('-p', `${cwd}/${name}`);
  }

  await cloneLibrary({ args, cwd: `${cwd}/${name}`, library });
  await shelljs.rm('-rf', `${cwd}/${name}/.git`);
  await revisePackage({ name, cwd: `${cwd}/${name}`, library });

  succeed('✨  File Generate Done');
}

const run = async config => {
  try {
    await command(config);
  } catch (err) {
    error(`> Generate failed ${err}`);
    process.exit(1);
  }
}

module.exports = run;