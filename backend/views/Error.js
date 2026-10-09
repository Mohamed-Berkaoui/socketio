class ErrorRes {
  constructor(error) {
    this.statusCode = 500;
    this.status = "ERROR";
    this.error = error;
  }
}

module.exports = ErrorRes;
