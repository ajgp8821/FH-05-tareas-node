var inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [{
      value: '1',
      name: `${'1.'.green} Crear una tarea`,
    },
    {
      value: '2',
      name: `${'2.'.green} Listar tareas`,
    },
    {
      value: '3',
      name: `${'3.'.green} Listar tareas completadas`,
    },
    {
      value: '4',
      name: `${'4.'.green} Listar tareas pendientes`,
    },
    {
      value: '5',
      name: `${'5.'.green} Completar tarea(s)`,
    },
    {
      value: '6',
      name: `${'6.'.green} Borrar tarea`,
    },
    {
      value: '0',
      name: `${'0.'.green} Salir`,
    },
    ]
  }
];

const inquirerMenu = async() => {
  console.clear();
  // process.stdout.write('\033c');
  console.log('==========================='.green);
  console.log('   Seleccione una opción'.white);
  console.log('===========================\n'.green);

  const { option } = await inquirer.prompt(questions);

  return option;

};

const pause = async() => {

  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'ENTER'.green} para continuar`
    }
  ];
  console.log('\n');
  await inquirer.prompt(question)
}

const readInput = async( message ) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value){
        if(value.length === 0 || value.trim() == ""){
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
}

const listTaskDelete = async( tasks = [] ) => {

  choices = tasks.map( (task, i) => {
    const idx = `${i + 1 }.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.description}`
    }
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ] 
  const { id } = await inquirer.prompt(questions);
  return id;
}

const confirm = async(message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
}

const showListCheckList = async( tasks = [] ) => {

  choices = tasks.map( (task, i) => {
    const idx = `${i + 1 }.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: (task.completedDate) ? true : false
    }
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices
    }
  ] 
  const { ids } = await inquirer.prompt(question);
  return ids;
}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listTaskDelete,
  confirm,
  showListCheckList
}
