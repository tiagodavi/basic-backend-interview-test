'use strict';

module.exports = (app) => {

  const controller = app.controllers.neo;

  const hazardousRoute = app.route(['/neo/hazardous']);
  const fastestRoute = app.route(['/neo/fastest']);
  const bestYearRoute  = app.route(['/neo/best-year']);
  const bestMonthRoute = app.route(['/neo/best-month']);

/**
 * @api {get} /neo/hazardous Read Hazardous
 * @apiGroup Neo
 *
 * @apiDescription Use this method to read all neos with hazardous asteroids
 *
 * @apiSuccessExample {json} Success-Response 200:
 * HTTP/ 200 HTTP_OK
 *  {
 *    data: [{
        _id: 59b56136676b7006cfbf2df5,
        date: '2017-09-10',
        reference: '3752803',
        name: '(2016 JX11)',
        isHazardous: true,
        speed: '70216.3023490094'
      },
      {
      _id: 59b56136676b7006cfbf2df5,
       date: '2017-09-11',
       reference: '3752803',
       name: '(2016 JX11)',
       isHazardous: true,
       speed: '70216.3023490094'
     }]
 *  }
 *
 * @apiExample {curl} Example usage:
 *  GET to http://localhost:3000/neo/hazardous
 */
 hazardousRoute.get(controller.read('hazardous'));

 /**
  * @api {get} /neo/fastest?hazardous=(true|false) Show Fastest
  * @apiGroup Neo
  *
  * @apiDescription Use this method to get the fastest neo asteroid
  *
  * @apiSuccessExample {json} Success-Response 200:
  * HTTP/ 200 HTTP_OK
  *  {
  *    data: {
         _id: 59b56136676b7006cfbf2df5,
         date: '2017-09-10',
         reference: '3752803',
         name: '(2016 JX11)',
         isHazardous: false,
         speed: '70216.3023490094'
       }
  *  }
  *
  * @apiExample {curl} Example usage:
  *  GET to http://localhost:3000/neo/fastest?hazardous=(true|false)
  */
 fastestRoute.get(controller.show('fastest'));

/**
 * @api {get} /neo/best-year?hazardous=(true|false) Show Best Year
 * @apiGroup Neo
 *
 * @apiDescription Use this method to get the year with most asteroids
 *
 * @apiSuccessExample {json} Success-Response 200:
 * HTTP/ 200 HTTP_OK
 *  {
 *    data: { year: '2017' }
 *  }
 *
 * @apiExample {curl} Example usage:
 *  GET to http://localhost:3000/neo/best-year?hazardous=(true|false))
 */
 bestYearRoute.get(controller.show('bestYear'));

 /**
  * @api {get} /neo/best-month?hazardous=(true|false) Show Best Month
  * @apiGroup Neo
  *
  * @apiDescription Use this method to get the month with most asteroids
  *
  * @apiSuccessExample {json} Success-Response 200:
  * HTTP/ 200 HTTP_OK
  *  {
  *    data: { month: '9' }
  *  }
  *
  * @apiExample {curl} Example usage:
  *  GET to http://localhost:3000/neo/best-month?hazardous=(true|false)
  */
 bestMonthRoute.get(controller.show('bestMonth'));

};
