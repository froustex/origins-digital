const AbstractRepository = require("./AbstractRepository");

class VideoRepository extends AbstractRepository {
  constructor() {
    super({ table: "video" });
  }

  async create(video) {
    const [result] = await this.database.query(
      `insert into ${this.table} (title, description, thumbnail, isPrivate, source) values (?, ?, ?, ?, ?)`,
      [
        video.title,
        video.description,
        video.thumbnail,
        video.isPrivate,
        video.source,
      ]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }

  async update(video, id) {
    const [result] = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [video, id]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = VideoRepository;
