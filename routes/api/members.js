const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

// gets all memberss
router.get("/", (req, res) => res.json(members));

// get single member

router.get("/:id", (req, res) => {
    const found = members.some(
        (member) => member.id === parseInt(req.params.id)
    );
    if (found) {
        res.json(
            members.filter((member) => member.id === parseInt(req.params.id))
        );
    } else {
        res.status(400).json({
            message: `No member with the id of ${req.params.id}`,
        });
    }

    // res.json(members.filter((member) => member.name === req.params.name));
});

// create members
router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        degree: "masters",
        status: "active",
    };
    if (!newMember.name || !newMember.email) {
        return res
            .status(400)
            .json({ msg: "Please include a name and an email" });
    }

    members.push(newMember);
    //res.json(members);
    res.redirect("/");
    //members.save(newMember);
});

// Update member

router.put("/:id", (req, res) => {
    const found = members.some(
        (member) => member.id === parseInt(req.params.id)
    );
    if (found) {
        const updMember = req.body;
        members.forEach((member) => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({ msg: "member updated", member });
            }
        });
    } else {
        res.status(400).json({
            message: `No member with the id of ${req.params.id}`,
        });
    }

    // res.json(members.filter((member) => member.name === req.params.name));
});

// Delete member

router.delete("/:id", (req, res) => {
    const found = members.some(
        (member) => member.id === parseInt(req.params.id)
    );
    if (found) {
        res.json({
            msg: "member deleted",
            members: members.filter(
                (member) => member.id === parseInt(req.params.id)
            ),
        });
    } else {
        res.status(400).json({
            message: `No member with the id of ${req.params.id}`,
        });
    }

    // res.json(members.filter((member) => member.name === req.params.name));
});

module.exports = router;
