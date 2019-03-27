const express = require('express');
const cors = require("cors");

module.exports = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(function (req, res, next) {
    res.setHeader('charset', 'utf-8')
    next();
  });
};
