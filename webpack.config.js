const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.export = {
    target: 'node',
    externals: [nodeExternals],
    entry: path.resolve(__dirname, 'src/server.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    // resolve: {
    //     modules: [
    //         'node_modules'
    //     ],
    //     extensions: ['.js', '.ts']
    // },
    // node: { fs: 'empty', net: 'empty', tls: 'empty' }
}