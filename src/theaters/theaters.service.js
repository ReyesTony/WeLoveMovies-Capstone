const knex = require("../db/connection");

function list() {
  return knex("theaters").then((theaters) => {
    return Promise.all(
      theaters.map((theater) => {
        return attachMovies(theater);
      })
    );
  });
}
async function attachMovies(theater) {
  theater.movies = await knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .where({ "movies_theaters.theater_id": theater.theater_id });
  return theater;
}

module.exports = {
  list,
};
