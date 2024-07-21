require("dotenv").config({ path: ".env" });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use("/api", routes);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
