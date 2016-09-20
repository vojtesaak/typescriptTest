'use strict';

import * as _ from 'lodash';

const config = {

    /**
     * @type {Boolean}
     */
    production: false,

    /**
     * @type {Boolean}
     */
    debugEnabled: true,

    /**
     * [initialize description]
     * @param {String} environment
     */
    initialize (environment) {

        if (!environment) {
            return;
        }
/*
        const defaultConfig = require(`./config.default`);
        Object.assign(this, defaultConfig);
*/
        try {
            const configuration = require(`./config.${environment}`);
            _.assign(this, configuration);
        } catch (e) {
            console.log(`Failed to log configuration for ENV: ${environment}`);
        }

    }


};

config.initialize(process.env.NODE_ENV || 'development');

export default config;
