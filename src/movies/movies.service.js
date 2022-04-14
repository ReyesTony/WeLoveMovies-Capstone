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
  return knex("movies as m")
    .join("reviews as r", "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movieId });
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
