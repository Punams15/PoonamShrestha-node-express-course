const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const { StatusCodes } = require('http-status-codes')
const { createCustomError } = require('../errors/custom-error')

// GET all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  // 200 — OK
  res.status(StatusCodes.OK).json({ tasks })
})

// CREATE task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  // 201 — Created
  res.status(StatusCodes.CREATED).json({ task })
})

// GET single task
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })

  if (!task) {
    // 404 — Not Found
    return next(createCustomError(`No task with id: ${taskID}`, StatusCodes.NOT_FOUND))
  }

  // 200 — OK
  res.status(StatusCodes.OK).json({ task })
})

// UPDATE task
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params

  const task = await Task.findOneAndUpdate(
    { _id: taskID },
    req.body,
    { new: true, runValidators: true }
  )

  if (!task) {
    // 404 — Not Found
    return next(createCustomError(`No task with id: ${taskID}`, StatusCodes.NOT_FOUND))
  }

  // 200 — OK
  res.status(StatusCodes.OK).json({ task })
})

// DELETE task
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })

  if (!task) {
    // 404 — Not Found
    return next(createCustomError(`No task with id: ${taskID}`, StatusCodes.NOT_FOUND))
  }

  // 200 — OK
  res.status(StatusCodes.OK).json({ task })
})

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask }


/*Added HTTP status code comments for each CRUD operation:

200 → OK

201 → Created

404 → Not Found */

/* CRUD Operation    Endpoint                 HTTP Status Code    Meaning
--------------------------------------------------------------------------------
Create             POST /api/v1/tasks        201               Created → task created successfully
Read All           GET /api/v1/tasks         200               OK → returns all tasks
Read Single        GET /api/v1/tasks/:id     200               OK → returns task if found
Read Single        GET /api/v1/tasks/:id     404               Not Found → task doesn’t exist
Update             PATCH /api/v1/tasks/:id   200               OK → task updated successfully
Update             PATCH /api/v1/tasks/:id   404               Not Found → task doesn’t exist
Delete             DELETE /api/v1/tasks/:id  200               OK → task deleted successfully
Delete             DELETE /api/v1/tasks/:id  404               Not Found → task doesn’t exist
Server Error       Any endpoint              500               Internal Server Error → unexpected error
*/

