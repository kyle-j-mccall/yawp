const pool = require('../utils/pool');

class Review {
  id;
  user_id;
  restaurant_id;
  stars;
  detail;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.stars = row.stars;
    this.restaurant_id = row.restaurant_id;
    this.detail = row.detail;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM reviews WHERE id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    console.log('get rows', rows[0]);
    return new Review(rows[0]);
  }

  static async insert({ userId, restaurantId, stars, detail }) {
    const { rows } = await pool.query(
      'INSERT INTO reviews (user_id, restaurant_id, stars, detail) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, restaurantId, stars, detail]
    );

    return new Review(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM reviews WHERE id =$1 RETURNING *',
      [id]
    );
    console.log('delete rows', rows);
    return new Review(rows[0]);
  }
}

module.exports = { Review };
