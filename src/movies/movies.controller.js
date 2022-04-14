const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");
const mapProperties = require("../utils/map-properties");

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

//almost working, need to format the data map the props and keep the needed ones
async function reviewRead(req, res) {
  const { movieId } = req.params;
  const data = await service.reviewRead(movieId);
  // console.log(data, "res");
  const formattedData = mapProperties({
    critic_id: "critic[0].critic_Id",
    preferred_name: "critic[0].preferred_name",
    surname: "critic[0].surname",
    organization_name: "critic[0].organization_name",
    created_at: "critic[0].created_at",
    updated_at: "critic[0].updated_at",
  });
  const newData = formattedData(data);
  // console.log(newData);
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
