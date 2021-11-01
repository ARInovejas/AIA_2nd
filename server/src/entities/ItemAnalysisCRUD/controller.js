import db from '../../database';

export const createItemAnalysis = ({ teacher_id, filename, total_rawscore, total_num_of_students, number_of_items, mean, students_above_mean, students_equals_mean, students_below_mean, section, year, subject }) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO itemanalysis VALUES (?, default, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [teacher_id, filename, total_rawscore, total_num_of_students, number_of_items, mean, students_above_mean, students_equals_mean, students_below_mean, section, year, subject];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }
      return resolve(rows.insertId);
    });
  });
};

export const viewItemAnalysis = ({ teacher_id, itemanalysis_id }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM itemanalysis WHERE teacher_id = ? AND itemanalysis_id = ?;`;

    const values = [teacher_id, itemanalysis_id];

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

export const viewAllItemAnalysis = ({ teacher_id }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM itemanalysis WHERE teacher_id = ?;`;

    const values = [teacher_id];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return reject(404);
      }

      return resolve(rows);
    });
  });
};


export const editItemAnalysis = ({ teacher_id, itemanalysis_id, filename, total_rawscore, total_num_of_students, number_of_items, mean, students_above_mean, students_equals_mean, students_below_mean, section, year, subject }) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE itemanalysis SET
      filename = ?,
      total_rawscore = ?,
      total_num_of_students = ?,
      number_of_items = ?,
      mean = ?,
      students_above_mean = ?,
      students_equals_mean = ?,
      students_below_mean = ?,
      section = ?,
      year = ?,
      subject = ?
    WHERE
      teacher_id = ? AND itemanalysis_id = ?;`;

    const values = [filename, total_rawscore, total_num_of_students, number_of_items, mean, students_above_mean, students_equals_mean, students_below_mean, section, year, subject, teacher_id, itemanalysis_id];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};

export const deleteItemAnalysis = ({ teacher_id, itemanalysis_id }) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM itemanalysis WHERE teacher_id = ? AND itemanalysis_id = ?;`;

    const values = [teacher_id, itemanalysis_id];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};
