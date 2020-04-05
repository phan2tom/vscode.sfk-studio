const child_process = require('child_process');

async function pack() {
  await exec('node_modules\\.bin\\webpack', ['--mode', 'production']);
  await exec('npm', ['i', '-P', 'typescript@3.5.3']);
  await exec('vsce', ['package']);
  await exec('npm', ['i', '-D', 'typescript@3.8.3']);
}
pack();

function exec(cmd, args) {
  return new Promise((resolve, reject) => {
    let proc = child_process.spawn(cmd, args, { stdio: 'inherit', shell: true });
    proc.on('close', code => {
      if (code !== 0) {
        console.log(`Process exited with code ${code}`);
        reject();
        process.exit(code);
      }
      resolve();
    });
  });
}