const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'ey-table-sheet.js', // 输出文件名
        path: path.resolve(__dirname, 'dist'), // 输出路径
        library: 'ey-table-sheet', // 库名称，全局变量名
        // libraryTarget: 'umd', // 模块化类型
        // umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm-bundler.js' // 使用完整版 Vue
        }
    }
};
