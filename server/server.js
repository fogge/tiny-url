const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

// Session and DB
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");

// Routes
const api = require("./routes/api");

// App config
const API_PORT = 4000;
const DATABASE_NAME = "tiny-url";
const dbRoute = `mongodb://localhost:27017/${DATABASE_NAME}`;
const app = express();

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cookieParser());
app.use(
  session({
    secret: "alittle1337",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
  })
);

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use("/api", api.router);

app.use("/", express.static("../client/build"));

app.get("/*", (req, res) => {
  let tinyUrl = req.url.substring(1);
  api
    .findAndRedirect(tinyUrl)
    .catch(err => console.log(err))
    .then(link => {
      if (link === null) {
        res.redirect(`/#/${tinyUrl}`);
      } else {
        res.redirect(link.webUrl);
      }
    });
});

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
