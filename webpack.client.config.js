
switch (process.env.NODE_ENV) {

	case 'production':
		module.exports = require('./webpackClient/webpack.production')({env: 'production'});
		break;

	case 'staging':
		module.exports = require('./webpackClient/webpack.production')({env: 'staging'});
		break;

	case 'testing':
		module.exports = require('./webpackClient/webpack.testing')({env: 'test'});
		break;

	case 'development':
	default:
		module.exports = require('./webpackClient/webpack.development')({env: 'development'});
}
