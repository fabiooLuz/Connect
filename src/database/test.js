const Database = require('./db');
const createTeacher = require('./createTeacher');

Database.then(async (db) => {
  //Inserir dados
  // teacher
  // teachers

  teacherValue = {
    name: 'Fábio Anderson Luz',
    avatar:
      'https://avatars1.githubusercontent.com/u/37920704?s=460&u=e8a461929335a908c3cebe891be4b02410cea0b4&v=4',
    whatsapp: '21983112123',
    bio:
      'Entusiasta das melhores tecnologias de dados avançada. Apaixonado por analizar dados e por mudar a vida das pessoas através de experiências. ',
  };

  classValue = {
    subject: 1,
    cost: '20',
    // o teacher id virá pelo banco de dados
  };

  classScheduleValues = [
    //class_id virá pelo banco de dados, após cadastrarmos a class
    {
      weekday: 1,
      time_from: 720,
      time_to: 1220,
    },
    {
      weekday: 0,
      time_from: 520,
      time_to: 1220,
    },
  ];
  // await createTeacher(db, { teacherValue, classValue, classScheduleValues });

  // Consultar os dados inseridos

  //todos os teachers
  const selectedteachers = await db.all('SELECT * FROM teachers');
  //console.log(selectedteachers);

  // consultar as classes de um determinado professor
  // e trazer junto os dados do professor
  const selectClassesAndTeachers = await db.all(`
    SELECT classes.*, teachers.*
    FROM teachers 
    JOIN classes ON (classes.teacher_id = teacher.id)
    WHERE classes.teacher_id = 1;
  `);
  //console.log(selectClassesAndTeachers);

  // o horário que a pessoa trabalha, é das 8h - 18h
  // o horário do time_from (08h) precisa ser  menor ou igual ao horário solicitado
  // o time_to precisa ser acima
  const selectClassesSchedules = await db.all(`
    SELECT class_schedule.* 
    FROM class_schedule
    WHERE class_schedule.class_id = "1"
    AND class_schedule.weekday = "0"
    AND class_schedule.time_from <= "1300"
    AND class_schedule.time_to > "1300"
  `);

  // console.log(selectClassesSchedules);
});
