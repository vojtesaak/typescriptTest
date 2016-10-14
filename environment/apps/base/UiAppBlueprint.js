module.exports = {
	"name": "Ui Test App",
	"workspacePath": "ui",
	"build": {
		"entries": {
			"app": {
				"entryFile" : "app/main.ts",
				"target": "web"
			}
		},
		"unparsed": [{
			'sourceFolder': 'static',
			'targetFolder': ''
		}]
	},
	"run": {
		"command" : "lite-server",
		"entry": "webserver"
	}
};
