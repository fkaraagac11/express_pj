// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//     res.send("<h1>Hello World<h1>");
// });
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`express started at ${5000}`));

//*******************Sending HTML file to the browser*************************-

const express = require("express");
const path = require("path");
const members = require("./Members");

const app = express();
const logger = require("./middleware/logger");

// init middleware
app.use(logger);

// geets all memberss
app.get("/api/members", (req, res) => res.json(members));

// creating static folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
