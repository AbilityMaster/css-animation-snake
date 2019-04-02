let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let CopyPlugin = require('copy-webpack-plugin');

let conf = {
	entry: [
	'./src/js/index.js',
	'./src/scss/style.scss'
	],
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main.js',
		publicPath: 'dist/'
	},
	devServer: {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				include: path.resolve(__dirname, 'src/scss'),
				use: ExtractTextPlugin.extract({
					//fallback: "style-loader",
					use: [{
							loader:"css-loader",
							options: {
								url: false
							}
						}, {
							loader:"sass-loader"
						}]
				})			
			},
		]
	},
	plugins: [ 
		new ExtractTextPlugin({
			filename: "./css/style.css",
			allChunks: true
		}),
	]
}

module.exports = (env, options) => {
	let production = options.mode === 'production';

	conf.devtool = production ? false : 'eval-sourcemap'

	return conf;
}