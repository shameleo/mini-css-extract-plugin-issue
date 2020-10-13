const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => ({
    mode: 'development',
    devtool: false,                
    entry: {
        'index': './src/index.js'
    },
    output: {
        filename: `[name].js`
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]    
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                'shared': {
                    chunks: 'all',
                    enforce: true,
                    test({resource}) {
                        const isMatched = resource && resource.includes('shared');
                        if (isMatched) {
                            console.log('~ ~ ~: ', resource);
                        }

                        return isMatched;
                    },
                    //priority: 100,          // didn't help
                    name: 'shared'
                }
            }
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `[name].css`
        }),
    ]
});