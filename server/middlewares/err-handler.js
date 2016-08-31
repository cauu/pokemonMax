module.exports = function* (next) {
  try {
    yield next;
  } catch(err) {
    this.status = err.code || 500;

    this.body = err;
  }
};
