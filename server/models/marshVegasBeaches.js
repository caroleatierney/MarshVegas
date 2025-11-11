const postgres = require("../postgres.js");

const marshVegasBeaches = {
  async all() {
    const result = await postgres.query(
      `SELECT * FROM marshVegasBeaches ORDER BY id ASC`
    );
    return result.rows;
  },

  async create(beach) {
    const result = await postgres.query(
      `INSERT INTO marshVegasBeaches (name, photo, photo_credit, access, parking, hours, avail_rec, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [
        beach.name,
        beach.photo,
        beach.photo_credit,
        beach.access,
        beach.parking,
        beach.hours,
        beach.avail_rec,
        beach.notes,
      ]
    );
    return result.rows[0];
  },

  async update(beach) {
    const result = await postgres.query(
      `UPDATE marshVegasBeaches SET name=$1, photo=$2, photo_credit=$3, access=$4, parking=$5, hours=$6, avail_rec=$7, notes=$8
       WHERE id=$9 RETURNING *`,
      [
        beach.name,
        beach.photo,
        beach.photo_credit,
        beach.access,
        beach.parking,
        beach.hours,
        beach.avail_rec,
        beach.notes,
        beach.id,
      ]
    );
    return result.rows[0];
  },

  async delete(id) {
    await postgres.query(`DELETE FROM marshVegasBeaches WHERE id = $1`, [id]);
  },
};

module.exports = marshVegasBeaches;