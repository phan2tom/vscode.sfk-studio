const child_process = require('child_process');

async function pack() {
  await exec('npm install -P typescript@3.5.3');
  await exec('vsce package');
  await exec('npm install -D typescript@3.8.3');
}
pack();

function exec(cmd) {
  return new Promise((resolve, reject) => {
    child_process.exec(cmd, (error, stdout, stderr) => {
      let out = stdout;
      if (error) {
        out += `\n${stderr}`;
      }
      if (out) {
        console.log(out);
      }
      if (error) {
        reject(error);
      }
      else {
        resolve();
      }
    });
  });
}