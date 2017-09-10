'use strict';

module.exports = (app)  => {

  const controller = {};

  controller.show = (req, res) => {
    return res.json({ data: { 'hello': 'world!' } });
  };

  return controller;

};
