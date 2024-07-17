const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "item" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (username, email, hashed_password, is_admin, avatar) values (?, ?, ?, ?, ?)`,
      [
        user.username,
        user.email,
        user.hashedPassword,
        user.isAdmin,
        user.avatar,
      ]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select id, username, email, hashed_password, is_admin, avatar from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(
      `select id, username, email, avatar, created_at from ${this.table}`
    );

    // Return the array of users
    return rows;
  }

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
    return rows[0];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user

  // async update(user) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID

  async delete(id) {
    const [rows] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return rows.affectedRows;
  }
}

module.exports = UserRepository;
