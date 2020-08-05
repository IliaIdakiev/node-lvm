const _spawn = require('child_process').spawn;

/* Spawn a new process */
/**
* @param {string} cmd - the command that we want to spawn
* @param {string[]} args - array of command arguments
* @param {string} cmdInput  - input that the command has to accept after it's run
* @return {Promise<string>} - if code is 0 then the promise is resolved and contains the cmd output otherwise the promise is rejected
*/
function spawn(cmd, args, cmdInput) {
  return new Promise((resolve, reject) => {
    const procedure = _spawn(cmd, args);
    let outData = '';
    let errData = '';

    if (cmdInput) {
      procedure.stdin.write(cmdInput);
    }

    procedure.stdout.on('data', chunk => {
      outData += chunk;
    });

    procedure.stderr.on('data', chunk => {
      errData += chunk;
    });

    procedure.on('error', (error) => {
      reject(error);
    });

    procedure.on('exit', (code) => {
      if (code === 0) { resolve(outData || errData); return; }
      reject(errData || outData);
    });
  });
}

module.exports = spawn;