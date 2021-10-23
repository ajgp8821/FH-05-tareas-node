const fs = require('fs');

const saveDB = (data) => {

  const file = './db/data.json';
  fs.writeFileSync(file, JSON.stringify(data), (err) => {
    if(err) throw err;
  });
}

module.exports = {
  saveDB
}
