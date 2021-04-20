const Database = require('sqlite-async');

function execute(db) {
  // Criar as tabelas do banco de dados.
  // teacher
  // teachers
  return db.exec(`
 CREATE TABLE IF NOT EXISTS teachers (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT,
     avatar TEXT,
     whatsapp TEXT,
     bio TEXT
 );

 CREATE TABLE IF NOT EXISTS classes (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     subject INTEGER,
     cost TEXT,
     teacher_id INTEGER
 );
 CREATE TABLE IF NOT EXISTS class_schedule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_id INTEGER,
    weekday INTEGER,
    time_from INTEGER,
    time_to INTEGER
);

 `);
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute);
