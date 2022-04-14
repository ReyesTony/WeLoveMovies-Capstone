const knex = require("../db/connection");


async function destroy(reviewId){
    return knex("reviews").where({"review_id" : reviewId}).del()
}

module.exports = {
    destroy
}