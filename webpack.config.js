/* eslint-disable */

const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const plugins = [new webpack.HotModuleReplacementPlugin()]

if (process.env.MODE === 'production') {
	plugins.push(
		new CompressionPlugin({
			algorithm: 'gzip',
		}),
	)
}

module.exports = {
	entry: './src/index.tsx',
	mode: process.env.MODE,
	optimization: {
		minimize: process.env.MODE === 'production',
		minimizer: [new TerserPlugin()],
		usedExports: true,
	},
	module: {
		rules: [
			{
				test: /\.(tsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'ts-loader',
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]',
							},
						},
					},
					'sass-loader',
				],
			},
		],
	},
	resolve: { extensions: ['*', '.js', '.ts', '.tsx'] },
	output: {
		path: path.resolve(__dirname, 'dist/'),
		publicPath: '/dist/',
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: path.join(__dirname, 'public/'),
		port: 8081,
		publicPath: 'http://localhost:8081/dist/',
		hotOnly: true,
	},
	plugins,
}
