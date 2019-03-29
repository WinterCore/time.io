module.exports = {
		entry   : "./src/index.js",
		target  : "node",
		devtool : "cheap-module-source-map",
		module  : {
		rules : [
			{
				test    : /\.js$/,
				exclude : /node_modules/,
				use     : "babel-loader"
			}
		]
	},
	output : {
    path     : __dirname,
    filename : "index.min.js"
	}
};