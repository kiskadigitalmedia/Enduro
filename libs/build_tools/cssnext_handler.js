// * vendor dependencies
const cssnext = require('postcss-cssnext');
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')

// * enduro dependencies
const logger = require(enduro.enduro_path + '/libs/logger')

const cssnext_handler = function () {}

cssnext_handler.prototype.init = function (gulp, browser_sync) {

	// stores task name
	const cssnext_handler_task_name = 'cssnext'

	// registeres task to provided gulp
	gulp.task(cssnext_handler_task_name, function () {

		logger.timestamp('cssnext compiling started', 'enduro_events')

		return gulp.src(enduro.project_path + '/assets/css/*.css')
			.pipe(sourcemaps.init())
			.pipe(postcss([true !== enduro.config.cssnext ? cssnext(enduro.config.cssnext) : cssnext()]))
			.on('error', function (err) {
				logger.err_blockStart('cssnext error')
				logger.err(err.message)
				logger.err_blockEnd()
				this.emit('end')
			})
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(enduro.project_path + '/' + enduro.config.build_folder + '/assets/css'))
			.pipe(browser_sync.stream())
			.on('end', () => {
				logger.timestamp('cssnext compiling finished', 'enduro_events')
			})
	})

	return cssnext_handler_task_name
}

module.exports = new cssnext_handler()
