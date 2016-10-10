'use strict';


module.exports = {
	devServerPort: 3333,

	devServerConfig: {
		hot: true,

		clientLogLevel: 'info',
		quiet: false,
		noInfo: false,

		publicPath: '/bundles/',
		stats: { colors: true }
	}
};
