
switch (process.env.NODE_ENV) {
	case 'prod':
	case 'production':
		module.exports = require('./webpackClient/webpack.production')({env: 'production'});
		break;

	case 'test':
	case 'testing':
		module.exports = require('./webpackClient/webpack.testing')({env: 'test'});
		break;

	case 'dev':
	case 'development':
	default:
		module.exports = require('./webpackClient/webpack.development')({env: 'development'});
}
