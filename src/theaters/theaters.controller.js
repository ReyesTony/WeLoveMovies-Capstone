const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

async function list(req, res) {
  const data = await service.list();
//   console.log(data, "test");
  res.json({
    data,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
