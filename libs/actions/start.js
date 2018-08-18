// * ———————————————————————————————————————————————————————— * //
// * 	enduro.actions.start
// * ———————————————————————————————————————————————————————— * //

const action = function () {}

const enduro_server = require(enduro.enduro_path + '/libs/enduro_server/enduro_server')

action.prototype.action = function () {
	enduro.config.webpackmode_prod = true;
	return enduro_server.run()
}

module.exports = new action()
