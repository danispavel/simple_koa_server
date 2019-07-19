require('dotenv').config();
const config = require('12factor-config');

module.exports = config({
  appPort: {
    env: 'APP_PORT',
    type: 'integer',
    required: true,
    default: 8500,
  },
});
