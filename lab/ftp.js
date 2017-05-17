const Client = require('ftp');
const client = new Client();

client.on('ready', () => {
  client.list('./FTV', (err, list) => {
    if (err) throw err;

    console.dir(list);
    client.end();
  });
});

client.connect({
  host: '172.16.0.11',
  user: 'ftpuser',
  password: 'abc.123'
});
