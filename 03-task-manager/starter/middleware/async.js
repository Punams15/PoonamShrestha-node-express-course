const asyncWrapper = (fn) => {  //Catches async errors,Sends them to error handler,No repeated try/catch
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)  //using next to pass the next middleware
    }
  }
}

module.exports = asyncWrapper



//asyncWrapper is a function that takes another function (fn) as input.

//fn is usually a controller function, like getTask or createTask.



