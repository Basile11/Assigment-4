const knex = require("knex");

class sql {
  constructor() {
    this.pg = knex({
      client: "pg",
      connection: {
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "Mappo007_postgres",
        database: "user_db",
        charset: "utf8",
      },
    });
  }

  getUsers = (req, res) => {
    this.pg("user_db").then((data) => {
      res.json(data);
    });
  };

  getUserById = (req, res) => {
    const user_id = parseInt(req.params.id);
    this.pg("user_db")
      .where({ user_id })
      .then((data) => {
        res.json(data);
      });
  };


  createUser = (req, res) => {
    const { lastname, firstname, user_number, age } =
      req.body;
    this.pg("user_db")
      .insert({ lastname, firstname, user_number, age })
      .then((data) => {
        console.log(data);
        res.json(data);
      });
  };

  updateUser = (req, res) => {
    const user_id = parseInt(req.params.id);
    const { lastname, firstname, user_number, age } =
      req.body;
    this.pg("user_db")
      .where({ user_id })
      .update({ lastname, firstname, user_number, age })
      .then((data) => {
        res.json(data);
      });
  };

  deleteUser = (req, res) => {
    const user_id = parseInt(req.params.id);
    this.pg("user_db")
      .where({ user_id })
      .del()
      .then((data) => {
        res.json(data);
      });
  };
}

module.exports = new sql();