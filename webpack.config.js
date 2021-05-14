const { merge } = require('webpack-merge');
const productionConfigObj = require('./webpack.config.prod.js');
const developmentConfigObj  = require('./webpack.config.dev.js');
//why is it empty object. ??
//because i have covered common configuration in both developmentConfigObj and productionConfigObj.
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
