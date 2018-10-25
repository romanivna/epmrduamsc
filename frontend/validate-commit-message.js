'use strict';

var fs = require('fs');
var path = require('path');
var findParentDir = require('find-parent-dir');

if (process.argv.join('').indexOf('mocha') === -1) {

  var getGitFolder = function() {
    var dir = findParentDir.sync(process.cwd(), '.git');
    if (!dir) throw new Error('Cannot find .git folder');
  
    var gitDir = path.join(dir, '.git');
    var stats = fs.lstatSync(gitDir);
  
    if (!stats.isDirectory()) {
      var pathToGit = fs
        .readFileSync(gitDir, 'utf-8')
        .split(':')[1]
        .trim();
      gitDir = path.join(dir, pathToGit);
  
      if (!fs.existsSync(gitDir)) {
        throw new Error('Cannot find file ' + pathToGit);
      }
    }
  
    return gitDir;
  };

  var bufferToString = function (buffer) {
    var hasToString = buffer && typeof buffer.toString === 'function';
    return hasToString && buffer.toString();
  };

  var getFileContent = function (filePath) {
    try {
      var buffer = fs.readFileSync(filePath);
      return bufferToString(buffer);
    } catch (err) {
      if(err && err.code !== 'ENOENT' && err.code !== 'ENAMETOOLONG') {
        throw err;
      }
    }
  };

  var getCommit = function() {
    var file;
    var fileContent;
    var gitDirectory;

    var commitMsgFileOrText = process.argv[2];
    var commitErrorLogPath = process.argv[3];

    var commit = {
      // if it is running from git directory or for a file from there
      // these info might change ahead
      message: commitMsgFileOrText,
      errorLog: commitErrorLogPath || null,
      file: null,
    };

    // On running the validation over a text instead of git files such as COMMIT_EDITMSG and GITGUI_EDITMSG
    // is possible to be doing that the from anywhere. Therefore the git directory might not be available.
    try {
      gitDirectory = getGitFolder();

      // Try to load commit from a path passed as argument
      if (commitMsgFileOrText) {
        file = gitDirectory + '/' + commitMsgFileOrText;
        fileContent = getFileContent(file);
      }

      // If no file or message is available then try to load it from the default commit file
      if (!fileContent && !commitMsgFileOrText) {
        file = gitDirectory + '/COMMIT_EDITMSG';
        fileContent = getFileContent(file);
      }

      // Could resolve the content from a file
      if (fileContent) {
        commit.file = file;
        commit.message = fileContent;
      }

      // Default error log path
      if (!commit.errorLog) {
        commit.errorLog = gitDirectory + '/logs/incorrect-commit-msgs';
      }
    } catch (err) {}

    return commit;
  };

  var getCurrentBranch = function() {
    var branchName = getFileContent(getGitFolder() + '/HEAD').replace(/\s*$/g, '');
    return branchName.slice(16);
  };

  var isBranchNameInvalid = function(currentBranch){
    var branchesException = [
      'develop'
    ]
    var PATTERN = new RegExp('^ST-[0-9]+|'+branchesException.join('|'),'g');
    return !PATTERN.test(currentBranch);
  }
  
  var isCommitMessageInvalid = function(message, currentBranch){
    var PATTERN = new RegExp('^('+currentBranch+'|Revert|Merge):\s*\w*(.|\s)*','g');
    return !PATTERN.test(message);
  }

  var validate = function (commit, currentBranch) {
    if(isCommitMessageInvalid(commit.message, currentBranch) || isBranchNameInvalid(currentBranch)){
      if (isCommitMessageInvalid(commit.message, currentBranch)) {
        console.log('Invalid commit message, use pattern "branch_name: message"');
      }
      if (isBranchNameInvalid(currentBranch)) {
        console.log('Invalid branch name, use pattern "ST-number_of_task_in_jira"');
      }
      process.exit(1);
    } else {
      process.exit(0);
    };
  };
  
  validate(getCommit(), getCurrentBranch());
}
