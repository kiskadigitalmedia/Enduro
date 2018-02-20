// global dependencies
const inquirer = require('inquirer')

// * enduro dependencies
const enduro_instance = require('../../index').quick_init()
const enduro_configurator = require(enduro.enduro_path + '/libs/configuration/enduro_configurator')
const logger = require(enduro.enduro_path + '/libs/logger')

module.exports = {
	command: 'gcloud',
	desc: 'sets up gcloud storage as enduro.js filesystem',
	builder: (yargs) => {
		return yargs
			.usage('enduro juice gcloud')
	},
	handler: function (cli_arguments) {
		logger.init('setting up gcloud')

		return inquirer.prompt([
			{
				name: 'gcloud.GCLOUD_PROJECT',
				message: 'Input your gcloud project id',
				type: 'input',
			},
			{
				name: 'gcloud.bucket',
				message: 'What is the gcloud bucket name?',
				type: 'input',
			},
			{
				name: 'juicebox_enabled',
				message: 'Enable juicebox',
				type: 'confirm',
				default: false,
			},
		])
			.then((answers) => {
				return enduro_configurator.set_config(answers)
			})
			.then(() => {
				logger.line()
				logger.log('gcloud set successfully')
				logger.end()
			})
	}
}
