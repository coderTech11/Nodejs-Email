require("dotenv").config();
const express = require("express");
const mail = require("./mail");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/email", mail);

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
