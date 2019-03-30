
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
    .then(() => {
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

router.get("/deleteLinks", (req, res) => {
  console.log('trying to delelete...')
  Link.deleteMany({session: req.session.id})
    .catch(err => console.log(err))
    .then(() => {
      res.json({message: 'Everything was successfully deleted.'})
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