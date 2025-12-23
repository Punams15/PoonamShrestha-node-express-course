const express = require("express");
const router = express.Router();

const { getPeople, addPerson } = require("../controllers/people");

// GET all people
router.get("/", getPeople);

// POST new person
router.post("/", addPerson);

module.exports = router;