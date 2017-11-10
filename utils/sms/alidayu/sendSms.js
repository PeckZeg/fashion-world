/**
 *  发送短信
 *  @param client 阿里大于实例
 *  @param {string} rec_num 手机号码
 *  @param {object} [params] 扩展参数
 *  @param {string} [params.sms_free_sign_name] 短信签名
 *  @param {string} [params.sms_param] 短信模板变量
 *  @param {string} [params.sms_template_code] 短信模板
 */
module.exports = (client, rec_num, params = {}) => new Promise((resolve, reject) => {
  client.execute('alibaba.aliqin.fc.sms.num.send', {
    extend: '',
    sms_type: 'normal',
    rec_num,
    ...params
  }, (err, result) => {
    if (err) {
      return reject(new ResponseError(500, err.message));
    }

    resolve(result);
  });
});
