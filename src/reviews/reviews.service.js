const knex = require("../db/connection");

async function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

async function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

async function update(updatedReview, reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).update({
    content: updatedReview.content,
  });
}

async function list(reviewId) {
  const result = await knex("reviews").where({ "reviews.review_id": reviewId });
  const review = result[0];
  review.critic = await attachCritic(review.critic_id);

  return review;
}

async function attachCritic(reviewId) {
  const critic = await knex("critics as c")
    .join("reviews as r", "c.critic_id", "r.critic_id")
    .distinct("c.*")
    .where({ "c.critic_id": reviewId });

  return critic[0];
}
module.exports = {
  read,
  destroy,
  update,
  list,
};
