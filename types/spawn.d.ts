export = spawn;
/**
* @param {string} cmd - the command that we want to spawn
* @param {string[]} args - array of command arguments
* @param {string} cmdInput  - input that the command has to accept after it's run
* @return {Promise<string>} - if code is 0 then the promise is resolved and contains the cmd output otherwise the promise is rejected
*/
declare function spawn(cmd: string, args: string[], cmdInput: string): Promise<string>;
