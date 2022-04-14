const knex = require("../db/connection");

async function list(query) {
  if (!query) {
    return knex("movies").select("*");
  } else if (query) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .distinct("m.*")
      .where({ "mt.is_showing": true });
  }
}

async function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

async function reviewRead(movieId) {
  const reviews = await knex("reviews as r").where({ "r.movie_id": movieId });
  const attachedCritics = await Promise.all(
    reviews.map(async (review) => {
      review.critic = await criticAttach(review);
    })
  );

  return reviews;
}

async function criticAttach(review) {
  const critic = await knex("critics as c")
    .join("reviews as r", "r.critic_id", "c.critic_id")
    .distinct("c.*")
    .where({ "c.critic_id": review.critic_id });

  return critic[0];
}

async function theaterRead(movieid) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "m.movie_id")
    .where({ "mt.movie_id": movieid });
}

module.exports = {
  list,
  read,
  reviewRead,
  theaterRead,
};
