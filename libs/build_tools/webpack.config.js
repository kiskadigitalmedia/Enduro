
module.exports = {
 mode: 'development',
 output: {'filename': '[name].js'},
 devtool: '#cheap-module-source-map',
 module: {
   rules: [
     {
       test: /\.js?$/,
       exclude: /(node_modules|bower_components)/,
       loader: 'babel-loader',
       options: {
         presets: ['env']
       }
     }
   ]
 }
};