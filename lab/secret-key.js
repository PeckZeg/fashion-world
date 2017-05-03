const createApiKey = require('../utils/api-key');
const createSecretKey = require('../utils/secret-key');

const NAME = 'PeckZeg';
const PASSWORD = 'peckzeg65536:?{OX}';

let apiKey = createApiKey(NAME, PASSWORD);
let secretKey = createSecretKey(apiKey);

console.log(JSON.stringify({ apiKey, secretKey }, null, 2));
