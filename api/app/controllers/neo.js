'use strict';

module.exports = (app)  => {

  const R = require('ramda');
  const model = app.models.neo;
  const controller = {};

  const isHazardous = (req) => {
    const hazardous = R.path(['query', 'hazardous'], req);
    return (hazardous == 'true');
  };

  const showData = (res) => {
    return (data) => {
      return res.json({ data });
    };
  };

  controller.read = (type) => {
    return (req, res) => {
      switch (type) {
        case 'hazardous':
          return model.findAllHazardousAsteroids()
          .subscribe(showData(res));
        break;
      };
    };
  };

  controller.show = (type) => {
    return (req, res) => {
      switch (type) {
        case 'fastest':
          return model.findFastest(isHazardous(req))
          .subscribe(showData(res));
        break;
        case 'bestYear':
          return model.findBestYear(isHazardous(req))
          .subscribe(showData(res));
        break;
        case 'bestMonth':
          return model.findBestMonth(isHazardous(req))
          .subscribe(showData(res));
        break;
      };
    };
  };

  return controller;

};
