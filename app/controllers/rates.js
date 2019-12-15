const { rateWeet } = require('../interactors/rates');

exports.create = (req, res, next) =>
  rateWeet({ weetId: req.body.weetId, score: req.body.score, user: req.user })
    .then(result => res.send(result))
    .catch(next);
