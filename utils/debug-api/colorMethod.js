module.exports = req => {
  const { method } = req;
  let color = 'black';

  switch (method) {
    case 'GET':
      color = 'green';
      break;

    case 'POST':
      color = 'yellow';
      break;

    case 'PUT':
      color = 'blue';
      break;

    case 'DELETE':
      color = 'red';
      break;

    default:

  }

  return colors.bold[color](method);
};
