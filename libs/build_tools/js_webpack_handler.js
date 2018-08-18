// * ———————————————————————————————————————————————————————— * //
// * 	JS Task
// *	Transpile ES6 to JS
// * ———————————————————————————————————————————————————————— * //
const js_webpack_handler = function () {}
// * ———————————————————————————————————————————————————————— * //
// * 	JS Task
// *	Transpile ES6 to JS
// * ———————————————————————————————————————————————————————— * //
// Gulp imports

// const del = require('del');
const webpackStream = require('webpack-stream');

// * vendor dependencies
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs-extra'))

// * enduro dependencies
const logger = require(enduro.enduro_path + '/libs/logger')

js_webpack_handler.prototype.init = function(gulp, browser_sync) {

  // stores task name
  const js_webpack_handler_task_name = 'webpack';
  gulp.task(js_webpack_handler_task_name, function() {
    logger.timestamp('JS compiling started', 'enduro_events');
    const build_folder = enduro.project_path + '/' + enduro.config.build_folder;
    const webpackConfig = require("./webpack.config.js");
    if(enduro.config.webpackmode_prod) webpackConfig.mode = "production"

    return gulp.src([
      enduro.project_path + '/assets/js/*.js',
      '!' + enduro.project_path + '/assets/js/*.min.js',
      '!' + enduro.project_path + '/assets/js/handlebars.js'
    ])
      .pipe(webpackStream(webpackConfig))
      .on('error', function(err) {
        logger.err_blockStart('JS error')
        logger.err(err.message)
        logger.err_blockEnd()
        this.emit('end')
      })
      .pipe(gulp.dest(build_folder + '/assets/js'))
      .pipe(browser_sync.stream())
      .on('end', () => {
          logger.timestamp('JS compiling finished', 'enduro_events')
        })
    });
  return js_webpack_handler_task_name;
}

module.exports = new js_webpack_handler();