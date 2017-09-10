
const connectionString = 'mongodb://sandbox:sandbox@ds133044.mlab.com:33044/sandbox';
const options = { config: { autoIndex: false }, useMongoClient: true };

module.exports = {

  getInstance() {
    return { connectionString, options };
  }

};
