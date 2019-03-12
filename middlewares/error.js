module.exports = (err, req, res, next) => {
  console.log('ERROR, :: ', err.message);
  res.status(500).send("Internal server error");
};
