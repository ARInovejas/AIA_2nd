import db from '../../database';

export const createTeacher = ({ email, name, position, department, year_level }) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO teacher VALUES (default, ?, ?, ?, ?, ?);`;

    const values = [email, name, position, department, year_level];
      
    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        console.log(rows);
        return reject(404);
      }

      return resolve(rows[0]);
    });
  });
};

export const viewTeacher = ({ email }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM teacher WHERE email = ?;`;

    const values = [email];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return reject(404);
      }

      return resolve(rows[0]);
    });
  });
};

export const viewTeachersByDept = ({ department }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT teacher_id, email, name, position, department, year_level FROM teacher WHERE department = ?;`;

    const values = [department];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return reject(404);
      }

      return resolve(rows[0]);
    });
  });
};

export const viewTeachersByDeptAndYearLevel = ({ department, year_level }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT teacher_id, email, name, position, department, year_level FROM teacher WHERE department = ? AND year_level = ?;`;

    const values = [department, year_level];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return reject(404);
      }

      return resolve(rows[0]);
    });
  });
};


export const editTeacher = ({ email, position, department, year_level }) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE teacher SET
      position = ?,
      department = ?,
      year_level = ?
    WHERE
      email = ?;`;

    const values = [position, department, year_level, email];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};

export const deleteTeacher = ({ teacher_id }) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM teacher WHERE teacher_id = ?;`;

    const values = [teacher_id];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};
