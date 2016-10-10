
switch (process.env.NODE_ENV) {

	case 'production':
		module.exports = require('./webpackServer/webpack.production')();
		break;

	case 'staging':
		module.exports = require('./webpackServer/webpack.production')();
		break;

	case 'testing':
		module.exports = require('./webpackServer/webpack.testing')();
		break;

	case 'development':
	default:
		module.exports = require('./webpackServer/webpack.development')();
}
