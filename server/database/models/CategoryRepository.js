const AbstractCategory = require("./AbstractRepository");

class CategoryRepository extends AbstractCategory {
  constructor() {
    super({ table: "category" });
  }

  async create(name) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (name) values (?)`,
      [name]
    );
    return rows.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }
}

module.exports = CategoryRepository;
