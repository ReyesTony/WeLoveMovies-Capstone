const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewIdExists(req, res, next) {
  const { reviewId } = req.params;
  const response = await service.read(reviewId);
  if (response) {
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found",
  });
}

async function destroy(req, res) {
  const { reviewId } = req.params;
  const response = await service.destroy(reviewId)
  res.sendStatus(204)
}

module.exports = {
  delete:[ reviewIdExists, asyncErrorBoundary(destroy)]
};
