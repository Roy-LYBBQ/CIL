/* eslint-disable */
const msg = require('fs').readFileSync('.git/COMMIT_EDITMSG', 'utf-8').trim();

const commitRE =
/^(revert: )?(((feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?:)|Merge) .{1,50}/;
console.log(msg);
if (!commitRE.test(msg)) {
  console.log("Commit message error!");
  process.exit(1);
}
