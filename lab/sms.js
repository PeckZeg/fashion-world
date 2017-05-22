const moment = require('moment');
const TopClient = require('topSdk').TopClient;

let client = new TopClient({
  appkey: '23580200',
  appsecret: 'adb3a077dd4819ada46710a2ee6333b5',
  REST_URL: 'http://gw.api.taobao.com/router/rest'
});

client.execute('alibaba.aliqin.fc.sms.num.send', {
  'extend' : '',
  'sms_type' : 'normal',
  'sms_free_sign_name' : '正辰',
  'sms_param' : JSON.stringify({ code: "173095" }),
  'rec_num' : '13055818112' ,
  'sms_template_code' : "SMS_67140688"
}, (err, res) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.dir(res);
  process.exit(0);
});
