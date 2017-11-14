const handleError = require('utils/response/handleError');

module.exports = async (req, res, next) => {
  try {
    const { inputKey: source, items } = req.body;
    let { key } = items[0];

    console.log({source,key});

    res.send({source,key})
  }

  catch (err) {
    handleError(res, err);
  }
};
