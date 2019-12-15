const { getRandomFact } = require('../services/numbers');
const { createWeet, getAllWeets } = require('../services/weets');

exports.create = ({ user }, res, next) =>
  getRandomFact()
    .then(numberFact =>
      createWeet({ content: numberFact.slice(0, 140), userId: user.id }).then(() => res.status(201).end())
    )
    .catch(next);

exports.getAll = (req, res, next) =>
  getAllWeets(req.query.limit, req.query.page)
    .then(weets => res.send(weets))
    .catch(next);
