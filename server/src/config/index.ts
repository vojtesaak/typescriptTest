'use strict';


const config = {

	env: null,


	/**
	 * [initialize description]
	 * @param {String} environment
	 */
	initialize (environment: string) {

		if (!environment) {
			return;
		} else {
			this.env = environment;
		}

		const defaultConfig = require(`./config.default`);
		Object.assign(this, defaultConfig);

		try {
			const configuration = require(`./config.${environment}`);
			Object.assign(this, configuration);

		} catch (e) {
			console.log(`Failed to log configuration for ENV: ${environment}`);
		}

		return this;

	}


};


export default config.initialize(process.env.NODE_ENV || 'development');
