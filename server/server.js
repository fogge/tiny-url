const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
// Models
const Link = require("./models/link");

const API_PORT = 4000;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://localhost:27017/tiny-url";

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.get("/hello", (req, res) => {
  res.json({ message: "User created" });
});

router.post("/createLink", (req, res) => {
  const { webUrl, tinyUrl, session } = req.body;
  new Link({
    webUrl,
    tinyUrl,
    session
  })
    .save()
    .then(link => {
      res.json({ success: true, message: "User created" });
    });
});

router.get("/getLinks", (req, res) => {
  Link.find({})
    .sort({'date': -1})
    .limit(10)
    .catch(err => console.log(err))
    .then(links => {
      res.json(links);   
    });
});

router.get('/*', (req, res) => {
  let tinyUrl = req.url.substring(1);
  Link.findOne({tinyUrl})
  .catch(err => console.log(err))
  .then(link => {
    if(link === null) {
      // Redirect to an error saying "This url doesnt exist yet! Create it!"
      res.redirect('/');
    } else {
      res.redirect(link.webUrl)
    }
  });
})

app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
