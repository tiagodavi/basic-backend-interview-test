'use strict';

module.exports = (app) => {

  const Neo = app.schemas.neo.getModel();
  const Observable = require('rx').Observable;
  const R = require('ramda');
  const repository = {};

  const getSpeed = (neo) => {
    let speed = R.head(R.propOr([], 'close_approach_data', neo));
    if(speed) {
       return R.path(['relative_velocity', 'kilometers_per_hour'], speed);
    }
    return '';
  };

  const validData = () => ([
    '_id',
    'date',
    'reference',
    'name',
    'speed',
    'isHazardous'
  ]);

  const aggregateByYear = (isHazardous) => ([
      { $match: { isHazardous } },
      {
        $group: {
          _id: { year: { $year: '$date' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
  ]);

  const aggregateByMonth = (isHazardous) => ([
      { $match: { isHazardous } },
      {
        $group: {
          _id: { month: { $month: '$date' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
  ]);

  const getAggregateResult = (result) => {
    return R.head(result)._id;
  };

  repository.create = (input) => {

    let info = [];

    R.pipe(
      R.path(['body', 'near_earth_objects']),
      R.mapObjIndexed((value, key, obj) => {
        R.map(v => {
          let getProp = R.propOr('', R.__, v);
          let data  = {
            date: key,
            reference: getProp('neo_reference_id'),
            name: getProp('name'),
            isHazardous:  getProp('is_potentially_hazardous_asteroid'),
            speed: getSpeed(v)
          };
          info = R.append(data, info);
        }, value);
      })
    )(input);

    return Observable.fromArray(info)
    .reduce((acc, record) => {
      //let entry = new Neo(record);
      //entry.save();
      return R.append(record, acc);
    }, []);
  };

  repository.findAllHazardousAsteroids = () => {
    const cleanData = R.project(validData());

    const query = Neo.find()
    .where({ isHazardous: true });

    return Observable.fromPromise(query.exec())
    .map(cleanData);
  };

  repository.findFastest = (isHazardous) => {
    const cleanData = R.pick(validData());

    const query = Neo.findOne()
    .where({ isHazardous })
    .sort('-speed')

    return Observable.fromPromise(query.exec())
    .map(cleanData);
  };

  /*
  I didn't understand how to proceed correctly here because the
  requirement says: "request the data from the last 3 days from nasa api".
  In that case the last 3 days are all in the same year (2017) and in the same month (09), but I simulated an
  aggregation that group by date (Year/Month), sum all asteroids of each year/month and order by the bigger sum DESC.
  It would return the year/month with most asteroids.
  */

  repository.findBestYear = (isHazardous) => {
    const query = Neo.aggregate(aggregateByYear(isHazardous));

    return Observable.fromPromise(query.exec())
    .map(getAggregateResult);
  };

  repository.findBestMonth = (isHazardous) => {
    const query = Neo.aggregate(aggregateByMonth(isHazardous));

    return Observable.fromPromise(query.exec())
    .map(getAggregateResult);
  };

  return repository;

};
