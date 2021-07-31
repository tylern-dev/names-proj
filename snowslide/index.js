
const inquirer = require('inquirer')
const { handleCommand } = require('./utils/command')

inquirer.prompt([
  {
    type: 'list',
    name: 'question',
    message: 'How do you want to dev?',
    choices:[{
      name: 'Start Deving',
      value:0,
    }, {
      name:'Start Client',
      value: 1,
    }, {
      name: 'Start Server',
      value: 2
    },
    new inquirer.Separator(),
    {
      name:'Update packages',
      value: 3
    }]
  }
]).then(({question }) => {

  switch(question){
    case 0:
      handleCommand('npm run dev')
    case 1:
      handleCommand('npm run client:only')
    case 2:
      handleCommand('npm run server')
    case 3:
      handleCommand()
  }
} )