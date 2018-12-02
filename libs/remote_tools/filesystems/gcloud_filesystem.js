// * ———————————————————————————————————————————————————————— * //
// * 	remote handler
// *	uploads files to gcloud storage
// * ———————————————————————————————————————————————————————— * //
const filesystem = function () {}

// * vendor dependencies
const Promise = require('bluebird')
const Storage = require('@google-cloud/storage')

// * enduro dependencies
const logger = require(enduro.enduro_path + '/libs/logger')

filesystem.prototype.init = function () {
	// no init required
}

filesystem.prototype.upload = function (filename, path_to_file) {
	const destination_url = this.get_remote_url(filename)

	return new Promise(function (resolve, reject) {
		const client = new Storage({
			projectId: enduro.config.gcloud.GCLOUD_PROJECT
		})
		client
			.bucket(enduro.config.gcloud.bucket)
			.upload(path_to_file, {
				destination: filename,
				metadata: {
					cacheControl: 'no-cache'
				}
			})
			.then(([file]) => {
				return file.makePublic()
			})
			.then(() => {
				logger.timestamp('File uploaded successfully: ' + destination_url)
				return resolve(destination_url)
			})
			.catch(err => {
				console.error('unable to upload:', err.stack)
				reject(err)
			})
	})
}

filesystem.prototype.get_remote_url = function (filename, juicebox) {
	return 'https://storage.googleapis.com/' + enduro.config.gcloud.bucket + '/' + filename
}

module.exports = new filesystem()
