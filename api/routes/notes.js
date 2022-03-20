const express = require("express");
const Note = require("../models/Note");
const parser = require("body-parser").urlencoded(
  { extended: true }
);

const router = express.Router();

router.get("/", (req, res) => {
    Note.find({})
        .then(notes => {
            res.json(notes);
        })
        .catch(err => {
            res.send("NO");
        });
});

router.get("/:id", (req, res) => {
  Note.findById(req.params.id)
        .then(note =>{
            res.json(note);
        }).catch( err =>{
            res.send("NO")
        })
});

router.post("/", parser, (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
  });
  note.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("OK");
    }
  });
});

router.delete("/:id", parser, (req, res) => {
  Note.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.send("NO");
    } else {
      res.send("OK");
    }
  });
});

router.put("/:id", parser, (req, res) => {
  Note.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    },
    (err) => {
      if (err) {
        res.send("NO");
      } else {
        res.send("OK");
      }
    }
  );
});


module.exports = router;
