const uploadFileFromUrl = require('./uploadFileFromUrl');

const IMAGE = 'http://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjRRLkMtOH384Z4ubribiaII2dbSXUxpoUV0F0BWQRFfDjSDlHy45k7ibDsMWia8EEkAGHD5SchSrtJA/0';

(async function() {
  try {
    console.log({
      key: await uploadFileFromUrl(IMAGE)
    });
    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
