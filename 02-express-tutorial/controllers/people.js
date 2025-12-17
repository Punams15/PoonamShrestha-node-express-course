const { people } = require("../data");

// GET all people
const getPeople = (req, res) => {
  res.json(people);
};

// POST add person
const addPerson = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }

  const newPerson = { id: people.length + 1, name };
  people.push(newPerson);

  res.status(201).json({ success: true, person: newPerson });
};

module.exports = { getPeople, addPerson };
