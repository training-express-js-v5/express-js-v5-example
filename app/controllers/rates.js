const { rateWeet } = require('../interactors/rates');

exports.create = ({ body: { score }, user, weet }, res, next) =>
  rateWeet({ weet, user, score })
    .then(result => res.send(result))
    .catch(next);
