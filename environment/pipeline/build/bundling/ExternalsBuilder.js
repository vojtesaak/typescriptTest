"use strict";

const PathProvider = require("../../../utils/PathProvider.js");
const path = require("path");
const _ = require('lodash');
const glob = require('glob');
const fs = require('fs');

function ExternalsBuilder() {
    var targetExternals = {
        node: getNodeExternals
    };

    this.getExternals = function (serviceBlueprint, template) {
        return (targetExternals[template.target] || getDefaultExternals)();
    };

    function getNodeExternals() {
        var uniqueNodeModules = getUniqueNodeModules(getAllModuleNames());

        return getIndexedModules(uniqueNodeModules);
    }

    function getDefaultExternals() {
        return {};
    }

    function getAllModuleNames() {
        return _.map(getAllNodeModules(), (modulePath) => path.basename(modulePath));
    }

    function getAllNodeModules() {
        return glob.sync(PathProvider.getWorkspacePath('') + '/**/node_modules/*');
    }

    function getUniqueNodeModules(node_modules) {
        return _.uniq(node_modules);
    }

    function getIndexedModules(uniqueNodeModules) {
        var modules = {};

        _.forEach(uniqueNodeModules, (module) => {
            modules[module] = markAsCommonJs(module);
        });

        return modules;
    }

    function markAsCommonJs(module) {
        return `commonjs ${module}`;
    }
}

module.exports = new ExternalsBuilder();