// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config) {
    if (!config.plugins) {
        config.plugins = [];
    }
	
	if (!config.module.rules) {
		config.module.rules
	}
	/**config.module.rules.push({
        test: /\.(png|jpe?g|gif|jp2|webp|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      })**/
	// console.log('config.module.rules', config.module.rules[1].oneOf);
    return config;
}