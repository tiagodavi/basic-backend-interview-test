const R = require('ramda');

module.exports = {

  buildDate(daysAgo = undefined, today = undefined) {
    let adjust = 0;

    if(R.isNil(today)) {
       today  = new Date();
       adjust = 1;
    }
    if(!R.isNil(daysAgo)) {
       today.setDate(today.getDate() - daysAgo);
    }

    return `${today.getFullYear()}-${today.getMonth() + adjust}-${today.getDate()}`;
  },

  getRangeOfDates(daysAgo){
    const startDate = this.buildDate(daysAgo);
    const endDate = this.buildDate();
    return { startDate, endDate };
  }

};
