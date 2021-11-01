import db from '../../database';

export const createFOE = ({ teacher_id, itemanalysis_id, item_number, foe, rank, raw_score, nswgrs, product }) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO foe_rawscore VALUES (default, ?, ?, ?, ?, ?, ?, ?, ?);`;

    const values = [teacher_id, itemanalysis_id, item_number, foe, rank, raw_score, nswgrs, product];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }
      return resolve();
    });
  });
};

export const viewFOE = ({ teacher_id, itemanalysis_id, item_number }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM foe_rawscore WHERE teacher_id = ? AND itemanalysis_id = ? AND item_number = ?;`;

    const values = [teacher_id, itemanalysis_id, item_number];

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

export const viewAllFOE = ({ teacher_id, itemanalysis_id }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM foe_rawscore WHERE teacher_id = ? AND itemanalysis_id = ?;`;

    const values = [teacher_id, itemanalysis_id];

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


export const editFOE = ({ teacher_id, itemanalysis_id, item_number, foe, rank, raw_score, nswgrs,  product }) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE foe_rawscore SET
      foe = ?,
      rank = ?,
      raw_score = ?,
      nswgrs = ?,
      product = ?
    WHERE
      teacher_id = ? AND itemanalysis_id = ? AND item_number = ?;`;

    const values = [foe, rank, raw_score, nswgrs,  product, teacher_id, itemanalysis_id, item_number];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};

export const deleteFOE = ({ teacher_id, itemanalysis_id }) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM foe_rawscore WHERE empno = ? AND itemanalysis_id = ?;`;

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
