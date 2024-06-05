path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    watch: true,
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: false,
        host: '0.0.0.0',
        compress: true,
        historyApiFallback: true,
        hot: true
    }
};