const checkCodeSentPerHour = require('utils/sms/checkSentPerHour');
const createTopClient = require('utils/sms/alidayu/createClient');
const checkCodeSentPerDay = require('utils/sms/checkSentPerDay');
const cacheSentMessage = require('utils/sms/cacheSentMassge');
const incrSentPerHour = require('utils/sms/incrSentPerHour');
const incrSentPerDay = require('utils/sms/incrSentPerDay');
const handleError = require('utils/response/handleError');
const checkCodeSent = require('utils/sms/checkSent');
const sendSms = require('utils/sms/alidayu/sendSms');
const createClient = require('redis/createClient');
const genCode = require('utils/genCode');

const { product } = config.alidayu;

module.exports = async (req, res, next) => {
  try {
    const { mobile } = req.body;
    const client = createClient();

    if (await checkCodeSent(client, mobile)) {
      throw new ResponseError(403, 'code has been sent');
    }

    await checkCodeSentPerHour(client, mobile);
    await checkCodeSentPerDay(client, mobile);

    const topClient = createTopClient();
    const code = genCode();

    await sendSms(topClient, mobile, {
      sms_param: JSON.stringify({ code, product }),
      ...config.alidayu.resetPassword
    });

    const expireIn = await cacheSentMessage(client, mobile, code);

    await incrSentPerHour(client, mobile);
    await incrSentPerDay(client, mobile);
    await client.quitAsync();

    let result = { mobile, expireIn };

    if (process.env.NODE_ENV !== 'production') {
      Object.assign(result, { code });
    }

    res.send(result);
  }

  catch (err) {
    handleError(res, err);
  }
};
