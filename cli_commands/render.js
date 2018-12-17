module.exports = {
	command: ['render', 'r'],
	desc: 'renders all static files',
	builder: {
		'nominify': {
			alias: 'm',
			describe: 'Turns off file minification'
		},
		'nojuice': {
			alias: 'j',
			describe: 'no-juice',
		}
	},
	handler: function (cli_arguments) {
		const enduro_instance = require('../index')

		enduro_instance.init()
			.then(() => {
				enduro.flags = cli_arguments
				enduro.actions.render()
			})
	}
}
