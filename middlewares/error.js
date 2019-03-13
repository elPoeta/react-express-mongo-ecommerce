module.exports = (err, req, res, next) => {
  // console.log('ERROR, :: ', err.message);
  res.status(500).json({ msg: "Internal server error", error: err.message });
};
