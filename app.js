require('colors');
const { inquirerMenu,
        pause,
        readInput,
        listTaskDelete,
        confirm
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async() => {

  let opt = '';
  const tasks = new Tasks();

  const tasksDB = readDB();

  if(tasksDB){ // Cargar tareas
    tasks.loadTaskFromArr(tasksDB);
  }

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
        tasks.allTasks();
        // console.log( tasks.listArray );
      break;

      case '3':
        tasks.listPendingCompleted(true);
      break;
        
      case '4':
        tasks.listPendingCompleted(false);
      break;

      case '6':
        const id = await listTaskDelete(tasks.listArray);
        if(id !== '0') {
          const ok = await confirm('¿Esta seguro?');
          if (ok) {
            tasks.deleteTask(id);
            console.log('Tarea borrada');
          }
        }
      break;
      
      default:
        break;
    }

    saveDB(tasks.listArray);


    await pause();

  } while (opt != '0');

}

main();
