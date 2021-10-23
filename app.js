require('colors');
const { inquirerMenu,
        pause,
        readInput
} = require('./helpers/inquirer');
const { saveDB } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async() => {

  let opt = '';
  const tasks = new Tasks();

  do{
    opt = await inquirerMenu();
    // console.log({opt});
    
    switch (opt) {
      case '1':
        const desc = await readInput('Descripción:');
        tasks.createTask(desc.trim());
        //console.log(desc);
      break;
      
      case '2':
        console.log( tasks.listArray );
      break;
      
      default:
        break;
    }

    // saveDB(tasks.listArray);


    await pause();

  } while (opt != '0');

}

main();
