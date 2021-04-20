module.exports = async function (
  db,
  { teacherValue, classValue, classScheduleValues }
) {

  // teacher
  // teachers
  // inserir dados na table de teachers
  const insertedTeacher = await db.run(`
    INSERT INTO teachers ( 
        name,
        avatar,
        whatsapp,
        bio
    ) VALUES (
        "${teacherValue.name}",
        "${teacherValue.avatar}",
        "${teacherValue.whatsapp}",
        "${teacherValue.bio}"
    )
  `);

  const teacher_id = insertedTeacher.lastID;

  // Inserir dados na tabela classes
  const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            teacher_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${teacher_id}"
        )
  `);
  const class_id = insertedClass.lastID;

  // Inserir dados na tabela class_schedule
  const insertedAllClassScheduleValues = classScheduleValues.map(
    (classScheduleValue) => {
      return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
      `);
    }
  );
  // Aqui vou executar todos os db.runs() das class_schedules
  await Promise.all(insertedAllClassScheduleValues);
};
