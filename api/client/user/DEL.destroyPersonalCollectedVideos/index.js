const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/user/auth-token');
const createClient = reqlib('./redis/create-client');
const validateBody = require('./validateBody');
const keys = reqlib('./redis/keys');

const ACTION = config.apiActions['client:user:destroy-personal-collected-videos'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate body params
    .then(({ userId }) => (
      validateBody(req.body)
        .then(({ videoIds }) => ({
          userId,
          videoIds: _.has(req.body, 'videoIds') ? videoIds : null
        }))
    ))

    // create redis client
    .then(args => ({ client: createClient(), ...args }))

    // fetch user collect videos
    .then(({ client, videoIds, userId }) => {
      if (Array.isArray(videoIds)) {
        return { client, videoIds, userId };
      }

      return client.hkeysAsync(
        keys('client:user:collected-videos')(userId)
      )
        .then(videoIds => ({ userId, client, videoIds }));
    })

    // create redis multi command
    .then(args => {
      const { client } = args;
      const multi = client.multi();

      return { multi, ...args };
    })

    // remove userId from each video
    .then(({ client, multi, videoIds, userId }) => {
      videoIds.forEach(videoId => {
        multi.hdel(
          keys('client:video:collected-users')(videoId),
          userId.toString()
        );
        multi.hdel(
          keys('client:user:collected-videos')(userId),
          videoId.toString()
        );
      });

      return { client, multi };
    })

    // exec redis multi command
    .then(({ client, multi }) => (
      multi.execAsync().then(() => client)
    ))

    // quit redis client
    .then(client => client.quitAsync())

    .then(() => res.send({ message: 'ok' }))
    .catch(err => handleError(res, err));
};
