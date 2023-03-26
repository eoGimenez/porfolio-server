const router = require("express").Router();
const Project = require("../models/Projects.model");

const bcrypt = require("bcryptjs");

router.get("/", (req, res, next) => {
    Project.find()
    .then(response => {
        res.json({response});
    })
    .catch(err => next(err));
});

router.get("/:projId", (req, res, next) => {
    const {projectId} = req.params
    Project.findById(projectId)
    .then(result => {
        res.json(result);
    })
    .catch(err => next(err));
});

router.post("/new", (req, res, next) => {
    const { title, description, technologies, url, image, ownCode } = req.body;
    if(!bcrypt.compareSync(ownCode, process.env.CRYPTCODE)) {
        res.json({ error: "Your Owner Code is not correct" });
        return;
    }
    Project.create({ title, description, technologies, url, image })
    .then(response => {
        res.json({ response: "Created !"});
    })
    .catch(err => console.log("paso esto", err));
});

router.put("/:projId/edit", (req, res, next) => {
    const { projectId } = req.params;
    const { title, description, technologies, url, image, ownCode } = req.body;
    if(!bcrypt.compareSync(ownCode, process.env.CRYPTCODE)) {
        res.json ({ error: "Your Owner Code is not correct" });
        return;
    };
    Project.findByIdAndUpdate(projectId, { title, description, technologies, url, image }, {new: trie})
    .then(result => {
        res.json(result);
    })
    .catch(err => next(err));
});

router.delete("/:projId/delete", (req, res, next) => {
    const { projectId } = req.params;
    const { ownCode } = req.body;
    console.log(req.params, req.body)
    if(!bcrypt.compareSync(ownCode, process.env.CRYPTCODE)) {
        res.json ({ error: "Your Owner Code is not correct" });
        return;
    };
    Project.findOneAndDelete(projectId)
    .then(result => {
        res.json({ result: `Project ${result.title} was deleted`})
    })
    .catch(err => next(err));
});

module.exports = router;