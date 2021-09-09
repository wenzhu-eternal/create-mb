#! /usr/bin/env node
const { info, error } = require("./lib/util");
const semver = require("semver");
const minimist = require("minimist");
const run = require('./lib/run');

info('👏 Welcome to WB!');

if (!semver.satisfies(process.version, '>= 10.0.0')) {
  error("✘ The generator will only work with Node v10.0.0 and up!");
  process.exit(1);
}

const args = minimist(process.argv.slice(2));

run({
  name: args._[0] || '',
  args,
});
