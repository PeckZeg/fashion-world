const redis = require('redis');
const client = redis.createClient();

client.on('error', err => {
  console.error('Error', err);
});

client.set('string key', 'string val');
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);

client.hkeys('hash key', (err, replies) => {
  console.log(replies.length, 'replies:');
  replies.forEach((reply, idx) => {
    console.log('\t', `${idx}:`, reply);
  })
  client.quit();
})
