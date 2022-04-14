const knex = require("../db/connection");

// async function list() {
//   return knex("theaters as t")
//     .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
//     .join("movies as m", "m.movie_id", "mt.movie_id")
//     .select("t.*", "m.*", "mt.*")
//     .groupBy("t.theater_id");
// }
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
