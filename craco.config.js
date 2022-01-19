// 使用less插件
const CracoLessPlugin = require('craco-less');
const path = require('path')
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        // 修改主题色 
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    babel: {
        // 支持装饰器模式语法
        plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }]
            // ["import", { libraryName: 'antd', style: true }]
        ]
    },
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            // 修改build的生成文件名称
            paths.appBuild = 'dist';
            webpackConfig.output = {
                ...webpackConfig.output,
                path: path.resolve(__dirname, 'dist'),
                // publicPath: '/'
            }
            return webpackConfig;
        }
    }
}