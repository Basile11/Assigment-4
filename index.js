const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const sql = require("./js/sql");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/user_db", sql.getUsers);
app.get("/user_db/:id", sql.getUserById);
app.post("/user_db", sql.createUser);
app.put("/user_db/:id", sql.updateUser);
app.delete("/user_db/:id", sql.deleteUser);

app.get("/api/ping", (req, res) => {
  res.send({
    message: "test".repeat(req.query.value),
    value: req.query.value,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});