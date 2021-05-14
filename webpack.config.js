const { merge } = require('webpack-merge');
const productionConfigObj = require('./webpack.config.prod.js');
const developmentConfigObj  = require('./webpack.config.dev.js');
const commonConfig = {};

module.exports = env => {
  switch(env) {
    case 'development':
      return merge(developmentConfigObj, commonConfig);
    case 'production':
      return merge(productionConfigObj, commonConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
}
