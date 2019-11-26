const { getRandomFact } = require('../services/numbers');
const { createWeet } = require('../services/weets');

exports.create = ({ user }, res, next) =>
  getRandomFact()
    .then(numberFact =>
      createWeet({ content: numberFact.slice(0, 140), userId: user.id }).then(() => res.status(201).end())
    )
    .catch(next);
