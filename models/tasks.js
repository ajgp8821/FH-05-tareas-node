const Task = require("./task");

/* 
  _listTask:
    { 'uuid-1234567-12345679': {'id': 12, 'description': 'asd', 'completedDate': '2020-01-01' } },
 */

class Tasks {

  _listTask = {};

  get listArray() {
    const list = [];
    Object.keys(this._listTask).forEach(key => {
      const task = this._listTask[key];
      list.push(task)
    });

    return list;
  }

  constructor() {
    this._listTask = {};
  }

  deleteTask(id = '') {
    if(this._listTask[id]) {
      delete this._listTask[id];
    }
  }

  loadTaskFromArr(tasks = []) {
    tasks.forEach( task => {
      this._listTask[task.id] = task;
    })
  }

  createTask(desc = '') {

    const task = new Task(desc);
    this._listTask[task.id] = task;
  }

  allTasks() {
    console.log();

    this.listArray.forEach((task, i) =>{
      // console.log(`${'1.'.green} Crear una tarea`);
      const idx = `${i + 1}`.green;
      const { description, completedDate } = task;
      // console.log('completedDate',completedDate);
      const state = ( completedDate )
        ? 'Completada'.green
        : 'Pendiente'.red
      console.log(`${idx} ${description} :: ${state}`);
    })
  }

  listPendingCompleted(completed = true) {
    let counter = 0;
    this.listArray.forEach((task) =>{
      const { description, completedDate } = task;
      const state = ( completedDate )
        ? 'Completada'.green
        : 'Pendiente'.red
      if(completed && completedDate){
        counter += 1;
        console.log(`${ (counter + '.').green} ${description} :: ${completedDate.green}`);
      }
      else if (!completed && !completedDate){
        counter += 1;
        console.log(`${ (counter + '.').green} ${description} :: ${state}`);
      }
    })
  }

  toggleCompleted( ids = [] ) {
    ids.forEach( id => {
      const task = this._listTask[id];
      if ( !task.completedDate ) {
        task.completedDate = new Date().toISOString()
      }
    });

    this.listArray.forEach( task => {
      if ( !ids.includes(task.id) ) {
        this._listTask[task.id].completedDate = null;
      }
    });
  }

}

module.exports = Tasks;
