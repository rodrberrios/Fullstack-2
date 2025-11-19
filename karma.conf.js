const webpackConfig = require('./webpack.config');

module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'src/**/*.test.js',
            'src/**/*.test.jsx'
        ],

        preprocessors: {
            'src/**/*.test.js': ['webpack'],
            'src/**/*.test.jsx': ['webpack'],
        },

        webpack: {
            ...webpackConfig,
            mode: 'development',
            resolve: {
                ...webpackConfig.resolve,
                alias: {
                    ...webpackConfig.alias,
                }
            }
        },

        browser: ['Chrome'],
        reporters: ['progress'],
        logLevel: config.LOG_INFO,
        singleRun:process.env.Cli === 'true',
        concurrency: Infinity,
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-webpack'
        ]
    });
};