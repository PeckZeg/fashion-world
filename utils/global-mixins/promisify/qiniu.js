const bluebird = require('bluebird');
const redis = require('redis');
const qiniu = require('qiniu');

const PROMISIFY_PROTOTYPES = [
  {
    constructor: qiniu.rs.BucketManager,
    multiArgsFuncNames: [
      'stat',
      'move',
      'delete'
    ]
  },
  {
    constructor: qiniu.form_up.FormUploader,
    multiArgsFuncNames: [
      'putFile',
      'putStream'
    ]
  },
  {
    constructor: qiniu.fop.OperationManager,
    multiArgsFuncNames: [
      'pfop'
    ]
  }
];

PROMISIFY_PROTOTYPES.forEach(({ constructor, multiArgsFuncNames }) => {
  if (Array.isArray(multiArgsFuncNames) && multiArgsFuncNames.length) {
    bluebird.promisifyAll(constructor.prototype, {
      filter: name => multiArgsFuncNames.includes(name),
      multiArgs: true
    });
  }
  bluebird.promisifyAll(constructor.prototype);
});
