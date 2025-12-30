class CustomAPIError extends Error {
  constructor(errorMessage, httpStatusCode) {
    super(errorMessage) //saves message
    this.statusCode = httpStatusCode //saves status code
  }
}

const createCustomError = (errorMessage, httpStatusCode) => {
  return new CustomAPIError(errorMessage, httpStatusCode)
}

module.exports = { createCustomError, CustomAPIError }

//Constructor builds the object, super sets the message, and this means “this object right now.”

/*Common HTTP Status Codes

200 — OK      , eg: res.status(200).json({ task })
201 — Created , eg: res.status(201).json({ task })
400 — Bad Request/ Input , eg: next(createCustomError("Task name is required", 400))
404 — Not Found ,    eg: next(createCustomError(\No task with id: ${taskID}`, 404))`
500 — Internal Server Error , eg: Automatically caught by error handler

starting 2 - Success
starting 4 - Your mistake
starting 5 -Server mistake */