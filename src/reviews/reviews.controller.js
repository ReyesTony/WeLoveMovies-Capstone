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
async function update(req, res, next) {
  const { reviewId } = req.params;
  const updatedReview = {
    ...req.body.data,
  };
  const newReview = await service.update(updatedReview, reviewId);
  const data = await service.list(reviewId)
  res.json({
    data,
  });
}
async function destroy(req, res) {
  const { reviewId } = req.params;
  const response = await service.destroy(reviewId);
  res.sendStatus(204);
}

module.exports = {
  delete: [reviewIdExists, asyncErrorBoundary(destroy)],
  update: [reviewIdExists, asyncErrorBoundary(update)],
};
