var dotenv = require('dotenv');
var path = require('path');

if(process.env.NODE_ENV != 'production'){
  dotenv.config({ path: path.resolve(__dirname, '.env') });
}

module.exports = {
  mongoose: {
    uri: process.env.MONGODB_URI
  },
}
