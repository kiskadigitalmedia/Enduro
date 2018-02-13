// * ———————————————————————————————————————————————————————— * //
// * 	remote handler
// *	uploads files to gcloud storage
// * ———————————————————————————————————————————————————————— * //
const filesystem = function () {}

// * vendor dependencies
const Storage = require('@google-cloud/storage')

// * enduro dependencies
const logger = require(enduro.enduro_path + '/libs/logger')

filesystem.prototype.init = function () {
	// no init required
}

filesystem.prototype.upload = function (filename, path_to_file) {
	const destination_url = this.get_remote_url(filename)

	const client = new Storage({
		projectId: enduro.config.gcloud.GCLOUD_PROJECT,
		keyFilename: enduro.config.gcloud.keyFilename
	})

	return client
		.bucket(enduro.config.gcloud.bucket)
		.upload(path_to_file)
		.then(([file]) => {
			return file.makePublic()
		})
		.then(() => {
			logger.timestamp('File uploaded successfully: ' + destination_url)
			return destination_url
		})
		.catch(err => {
			console.error('unable to upload:', err.stack)
			throw err
		})
}

filesystem.prototype.get_remote_url = function (filename, juicebox) {
	return 'https://storage.googleapis.com/' + enduro.config.gcloud.bucket + '/' + filename
}

module.exports = new filesystem()
