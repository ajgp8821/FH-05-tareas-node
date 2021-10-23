require('colors');
const { inquirerMenu, pause } = require('./helpers/inquirer');
const Task = require('./models/task');
const Tasks = require('./models/tasks');
// const { showMenu, pause } = require('./helpers/messages');

// console.clear();

const main = async() => {
  
  console.log('Hola mundo');

  let opt = '';

  do{
    opt = await inquirerMenu();
    console.log({opt});
    // if (opt !== '0')
    // const tasks = new Tasks();
    // const task = new Task('Compara comida');

    // tasks._listTask[task.id] = task;
    // console.log(tasks);
    await pause();

  } while (opt != '0');

}

main();
