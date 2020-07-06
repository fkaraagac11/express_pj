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
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();
// init middleware
//app.use(logger);

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// //homepage route
// app.use("/", (req, res) => {
//     res.render("index", { title: "Member Application", members });
// });

// set static folder
app.use(express.static(path.join(__dirname, "public")));

//Members API routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
