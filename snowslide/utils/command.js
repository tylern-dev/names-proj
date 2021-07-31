
const exec = require('child_process').exec

function handleCommand (cmd) {
  // if(!cmd) throw new Error('Please provide a command')
  const command = exec(cmd)
  command.stdout.on('data', (data) => console.log(data))

}

module.exports = {
  handleCommand
}