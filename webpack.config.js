var path = require('path')
var webpack = require('webpack')

var comUtils = require('com-utils')


var IS_PROD = process.env.NODE_ENV == 'production'

module.exports = {
    entry: {
        loadMovies: './react/loadMovies'
    },
    output: {
        path: path.resolve(__dirname, './assets/compiled'),
        publicPath: '/compiled/',
        filename: '[name].js',
        library: '[name]'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ // order matters (runs last to first)
                            ['es2015', { modules: false }],
                            'stage-2',
                            'react'
                        ]
                    }
                }
            },
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), comUtils.MVP_JS_PATH],
        extensions: ['.js', '.jsx']
    },
    devtool: IS_PROD ? false : 'eval',
    plugins: []
}
