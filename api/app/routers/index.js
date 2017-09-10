'use strict';

module.exports = (app) => {

  const controller = app.controllers.index;

  const route = app.route(['/']);

/**
 * @api {get} / Show
 * @apiGroup Index
 *
 * @apiDescription Use this method to show a Hello World Message
 *
 * @apiSuccessExample {json} Success-Response 200:
 * HTTP/ 200 HTTP_OK
 *  {
 *    data: { 'hello': 'world!' }
 *  }
 *
 * @apiExample {curl} Example usage:
 *  GET to http://localhost:3000/
 */
 route.get(controller.show);

};
