const { rateWeet } = require('../interactors/ratings');

exports.create = ({ body: { score }, user, weet }, res, next) =>
  rateWeet({ weet, user, score })
    .then(result => res.send(result))
    .catch(next);
