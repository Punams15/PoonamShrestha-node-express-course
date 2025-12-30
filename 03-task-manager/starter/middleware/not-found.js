const notFound = (req, res) => res.status(404).send("Route does not exist")

module.exports = notFound



//catch all unknown routes and return a 404 status.

//The module.exports = notFound line lets me use it in app.js with app.use(notFound).