const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const query = req.query.is_showing;
  const data = await service.list(query);
  res.json({
    data,
  });
}
async function movieIdExists(req, res, next) {
  const { movieId } = req.params;
  const response = await service.read(movieId);
  if (response) {
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found",
  });
}

async function read(req, res) {
  const { movieId } = req.params;
  const data = await service.read(movieId);
  res.json({
    data,
  });
}

async function reviewRead(req, res) {
  const { movieId } = req.params;
  const data = await service.reviewRead(movieId);
  res.json({
    data,
  });
}

async function theaterRead(req, res) {
  const { movieId } = req.params;
  const data = await service.theaterRead(movieId);
  res.json({
    data,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [movieIdExists, asyncErrorBoundary(read)],
  reviewRead: [movieIdExists, asyncErrorBoundary(reviewRead)],
  theaterRead: [movieIdExists, asyncErrorBoundary(theaterRead)],
};
