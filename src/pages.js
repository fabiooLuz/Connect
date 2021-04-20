const Database = require('./database/db');

const {
  subjects,
  weekdays,
  getSubject,
  convertHoursToMinutes,
} = require('./utils/format');

function pageLanding(req, res) {
  return res.render('index.html');
}


async function pageStudy(req, res) {
  //console.log(req.query);
  const filters = req.query;

  if (!filters.subject || !filters.weekday || !filters.time) {
    return res.render('study.html', { filters, subjects, weekdays });
  }

  // coverter horas em minutos
  const timeToMinutes = convertHoursToMinutes(filters.time);

  const query = `
    SELECT classes.*, teachers.*
    FROM teachers 
    JOIN classes ON (classes.teacher_id = teachers.id)
    WHERE EXISTS( 
        SELECT class_schedule.* 
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = ${filters.weekday}
        AND class_schedule.time_from <= ${timeToMinutes}
        AND class_schedule.time_to > ${timeToMinutes}
    )
    AND classes.subject = '${filters.subject}'  
  `;
  // caso haja erro na hora da consulta do banco de dados
  try {
    const db = await Database;
    const teachers = await db.all(query);

    teachers.map((teacher) => {
      teacher.subject = getSubject(teacher.subject);
    });

    return res.render('study.html', { teachers, subjects, filters, weekdays });
  } catch (error) {
    console.log(error);
  }
}

function pageGiveClasses(req, res) {
  return res.render('give-classes.html', { subjects, weekdays });
}

async function saveClasses(req, res) {
  const createTeacher = require('./database/createTeacher');

  const teacherValue = {
    name: req.body.name,
    avatar: req.body.avatar,
    whatsapp: req.body.whatsapp,
    bio: req.body.bio,
  };

  const classValue = {
    subject: req.body.subject,
    cost: req.body.cost,
  };

  const classScheduleValues = req.body.weekday.map((weekday, index) => {
    return {
      weekday,
      time_from: convertHoursToMinutes(req.body.time_from[index]),
      time_to: convertHoursToMinutes(req.body.time_to[index]),
    };
  });

  try {
    const db = await Database;
    await createTeacher(db, { teacherValue, classValue, classScheduleValues });

    let queryString = '?subject=' + req.body.subject;
    queryString += '&weekday=' + req.body.weekday[0];
    queryString += '&time=' + req.body.time_from[0];

    return res.redirect('/study' + queryString);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses,
};
