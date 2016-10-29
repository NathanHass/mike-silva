var path = require('path');

module.exports = {
    entry: __dirname + "/static/js/main.js",
    output: {
        path: path.join(__dirname, "/static/build"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    },
    resolve: {
        modulesDirectories: [
            "static/js/vendor",
            "node_modules"
        ]
    },
    externals: {
        jquery: "jQuery"
    },

};
