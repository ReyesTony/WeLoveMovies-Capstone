const knex = require("../db/connection");

async function read(reviewId) {
  return knex("reviews").select("*").where({ "review_id" : reviewId }).first();
}

async function destroy(reviewId) {
  return knex("reviews").where({ "review_id": reviewId }).del();
}

module.exports = {
  read,
  destroy,
};
