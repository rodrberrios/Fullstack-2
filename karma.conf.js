module.exports = function (config) {
    config.set({
        // Framework base
        frameworks: ['jasmine'],

        // Archivos a incluir en las pruebas - Tests JS y JSX
        files: [
            'src/test/unit/**/*.test.js',
            'src/test/unit/**/*.test.jsx'
        ],

        // Excluir archivos problemáticos
        exclude: [
            'src/**/*.test.ts',
            'src/**/*.test.tsx',
            'src/App.test.js',
            'src/components/**/*.test.js'
        ],

        // Preprocesadores para JS y JSX
        preprocessors: {
            'src/test/unit/**/*.test.js': ['webpack'],
            'src/test/unit/**/*.test.jsx': ['webpack']
        },

        // Webpack configurado correctamente con soporte JSX
        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    ['@babel/preset-react', { runtime: 'automatic' }]
                                ]
                            }
                        }
                    },
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        auto: true,
                                        localIdentName: '[name]__[local]--[hash:base64:5]'
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx']
            }
        },

        // Navegadores
        browsers: ['Chrome'],

        // REPORTERS MEJORADOS
        reporters: ['mocha', 'progress', 'kjhtml'],

        // Configuración específica para cada reporter
        mochaReporter: {
            output: 'autowatch',
            showDiff: true,
            colors: {
                success: 'green',
                info: 'blue',
                warning: 'yellow',
                error: 'red'
            }
        },

        // Configuración del reporter de spec
        specReporter: {
            maxLogLines: 5,
            suppressErrorSummary: false,
            suppressFailed: false,
            suppressPassed: false,
            suppressSkipped: false,
            showSpecTiming: true,
            failFast: false
        },

        // Plugins
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-webpack',
            'karma-mocha-reporter',
            'karma-spec-reporter',
            'karma-jasmine-html-reporter'
        ],

        // Configuración adicional
        autoWatch: true,
        singleRun: process.env.CI === 'true',

        // Log level más detallado
        logLevel: config.LOG_INFO,

        // Colores en la salida
        colors: true,

        // Tiempo de espera
        browserNoActivityTimeout: 30000
    });
};