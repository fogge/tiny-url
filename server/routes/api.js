
const router = require("express").Router();
// Models
const Link = require("../models/link");

router.post("/createLink", (req, res) => {
  const { webUrl, tinyUrl, session } = req.body;
  new Link({
    webUrl,
    tinyUrl,
    session: req.session.id,
    date: new Date()
  })
    .save()
    .then(link => {
      res.json({ success: true, message: "User created" });
    });
});

router.get("/getLinks", (req, res) => {
  Link.find({session: req.session.id})
    .sort({'date': -1})
    .limit(10)
    .catch(err => console.log(err))
    .then(links => {
      res.json(links);
    });
});

findAndRedirect = (tinyUrl) =>  Link.findOne({tinyUrl});

router.get("/exists/:tinyUrl", (req, res) => {
  Link.findOne({tinyUrl: req.params.tinyUrl})
    .catch(err => console.log(err))
    .then(link => {
      res.json(!!link)
    })
})

module.exports = {router, findAndRedirect};