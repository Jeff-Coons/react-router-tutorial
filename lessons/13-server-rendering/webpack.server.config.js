var fs = require('fs');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'server.js'),

    output: {
        filename: 'server.bundle.js'
    },

    target: 'node',

    // Keep node_modules out of the bundle
    externals: fs.readdirSync(path.reselve(__dirname, 'node_modules')).concat([
        'react-dom/server', 'react/addons',
    ]).reduce(function (ext, mod) {
        ext[mod] = 'commonjs ' + mod;
        return ext
    }, {}),

    node: {
        __filename: true,
        __dirname: true
    },

    module: {
        loaders: [
            {
                test: /\.js$/, exclude: /node_modules/,
                loader: 'bable-loader?presets[]=es2015&presets[]=react'
            }
        ]
    }
}
