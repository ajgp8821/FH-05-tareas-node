const Task = require("./task");

/* 
  _listTask:
    { 'uuid-1234567-12345679': {'id': 12, 'description': 'asd', 'completedDate': '2020-01-01' } },
 */

class Tasks {

  _listTask = {};

  constructor() {
    this._listTask = {};
  }

  createTask(desc = '') {

    const task = new Task(desc);
    this._listTask[task.id] = task;
  }

}

module.exports = Tasks;
