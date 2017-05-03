const crypto = require('crypto');
const querystring = require('querystring');
const uuid = require('uuid/v4');

const SECRET = 'caa-api-key';

let name = 'PeckZeg';
let password = 'peckzeg65536:?{OX}';

let algorithm = querystring.stringify({
  name, password,
  timestamp: new Date().toString(),
  uuid: uuid()
});


const hash = crypto.createHmac('sha256', SECRET)
                .update(algorithm)
                .digest('base64');

console.log(algorithm, hash);
