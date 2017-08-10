const now = moment();
const start = +(now.clone().add(-14, 'days').startOf('day'));
const end = +(now.clone().add(3, 'days').endOf('day'));

module.exports = () => moment(_.random(start, end)).toDate();
