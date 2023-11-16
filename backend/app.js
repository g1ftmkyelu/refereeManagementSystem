require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { setupDynamicRoutes, setupAuth } = require("./core");
const {

  Users,
 
} = require("./resources");

//DB Connection
require("./configs/dbConfig");

const resources = [

  Users,

];

const app = express();
app.use(express.json());
app.use(cors());
app.use(setupAuth(Users));

resources.forEach((resource) => {
  app.use(setupDynamicRoutes(resource));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
