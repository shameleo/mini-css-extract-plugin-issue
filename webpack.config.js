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
                    test(module) {
                        // This is NOT correct
                        const isMatched = module.resource && module.resource.includes('shared');

                        // This is correct
                        //const isMatched = module.nameForCondition().includes('shared');
                        
                        console.log('res : ', module.resource);
                        console.log('name: ', module.nameForCondition());
                    
                        return isMatched;
                    },
                    name: 'shared-bundle'
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