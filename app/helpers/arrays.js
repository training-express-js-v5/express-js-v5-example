const descendingOrder = field => (a, b) => b[field] - a[field];
const ascendingOrder = field => (a, b) => a[field] - b[field];

exports.orderObjectArrayByField = (array, field, order) =>
  order === 'ASC' ? array.sort(ascendingOrder(field)) : array.sort(descendingOrder(field));
