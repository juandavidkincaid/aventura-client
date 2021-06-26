import path from 'path';
import { cpus } from "os";
import fs from 'fs-extra';
import webpack, {Configuration, Compiler} from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import TsCheckerPlugin from "fork-ts-checker-webpack-plugin";


const MomentLocalesPlugin = require("moment-locales-webpack-plugin");


const prodOrDev = (a: any, b: any)=>{
    return process.env.NODE_ENV === 'production' ? a : b;
};

const aliases = {
    /*Commons: path.resolve(__dirname, 'src/Commons'),*/
    '@aventura-src': path.resolve(__dirname, 'src'),
    '@aventura-core': path.resolve(__dirname, 'src/core'),
    '@aventura-state': path.resolve(__dirname, 'src/state'),
    '@aventura-util': path.resolve(__dirname, 'src/util'),
    '@aventura-res': path.resolve(__dirname, 'src/res'),
    '@aventura-styling': path.resolve(__dirname, 'src/styling'),
    '@aventura-components': path.resolve(__dirname, 'src/components'),
    '@aventura-modules': path.resolve(__dirname, 'src/modules'),
    'momentz': path.resolve(__dirname, 'src/core/modules/moment-timezone'),
}

const baseConfig: Configuration = {
    module: {
        rules: [
            {
                enforce: "pre",
                // We only want js files, don't add typescript.
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.svg$|\.ttf$|\.njk$|\.jpg$|\.png$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[hash][ext]'
                }
            },
            {
                test: /\.(ts)$/i,
                exclude: [
                    path.resolve(__dirname, 'src/res'),
                    /(node_modules|bower_components)/,
                ],
                use: [
                    {
                        loader: "thread-loader", // Throw ts-loader into multi-threading to speed things up.
                        options: {
                            workers: cpus.length - 1,
                            poolTimeout: Infinity,
                        },
                    },
                    {
                        loader: "babel-loader",
                        options:{
                            plugins: [
                                "@babel/plugin-proposal-optional-chaining",
                                "@babel/plugin-proposal-nullish-coalescing-operator",
                                prodOrDev(false, "babel-plugin-styled-components")
                            ].filter(Boolean)
                        }
                    },
                    {
                        loader: "ts-loader",
                        options:{
                            happyPackMode: true,
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.(tsx?)$/i,
                exclude: [
                    path.resolve(__dirname, 'src/res'),
                    /(node_modules|bower_components)/,
                ],
                use: [
                    {
                        loader: "thread-loader", // Throw ts-loader into multi-threading to speed things up.
                        options: {
                            workers: cpus.length - 1,
                            poolTimeout: Infinity,
                        },
                    },
                    {
                        loader: "babel-loader",
                        options:{
                            presets: [
                                "@babel/preset-react"
                            ],
                            plugins: [
                                "@babel/plugin-proposal-optional-chaining",
                                "@babel/plugin-proposal-nullish-coalescing-operator",
                                prodOrDev(false, "babel-plugin-styled-components"),
                                prodOrDev(false, "react-refresh/babel")
                            ].filter(Boolean)
                        }
                    },
                    {
                        loader: "ts-loader",
                        options:{
                            happyPackMode: true,
                            transpileOnly: true
                        }
                    },
                ]
            }
        ]
    },
    resolve:{
        alias: aliases,
        extensions: ['.js', '.json', '.ts', '.tsx']
    }
};

class ClientStatsBundlerPlugin{
    dest: string;
    logger?: ReturnType<Compiler["getInfrastructureLogger"]>;

    constructor(dest: string){
        this.dest = dest;
    }

    apply(compiler: Compiler) {
        this.logger = compiler.getInfrastructureLogger(this.pluginName);

        compiler.hooks.done.tapPromise(this.pluginName, async (stats) => {
            if(this.dest){
                const ostats = stats.toJson().entrypoints;
                await fs.outputJSON(path.resolve(this.dest), ostats);
            }
        });
    }

    info(msg: string) {
        if(this.logger){
            this.logger.info(msg);
        }
    }

    get pluginName() {
        return 'ClientStatsBundlerPlugin';
    }
}


const clientConfig: Configuration = Object.assign({}, baseConfig, {
    entry: {
        app: './src/app.tsx'
    },
    output:{
        path: path.join(process.cwd(), './dist'),
        library: {
            name: 'aventura-client',
            type: 'umd'
        },
        filename: prodOrDev('[chunkhash].[fullhash].js', '[name].js'),
        chunkFilename: prodOrDev('[chunkhash].[fullhash].js', '[name].js'),
        publicPath: '/static/client/',
        devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]'
    },
    devtool: "source-map",
    devServer: prodOrDev(undefined, {
        contentBase: '/static/client/',
        publicPath: '/static/client/',
        hot: true,
        host: '0.0.0.0',
        port: 8081,
        proxy: {
            '*': 'http://localhost:8080'
        }
    }),
    optimization:{
        
    },
    plugins: [
        new ClientStatsBundlerPlugin('./dist/clientstats.json'),
        new TsCheckerPlugin({
            async: prodOrDev(false, true), // Only report after a run, freeing the process to work faster
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                build: prodOrDev(true, false), // Build mode speeds up consequential builds (evertyhing after the first build, based on the prior build)
                configFile: path.resolve(__dirname, "tsconfig.json"),
                mode: "write-tsbuildinfo",
                profile: prodOrDev(false, true), // Don't slow down production by profiling, only in development do we need this information.
            },
        }),
        new CleanWebpackPlugin({
            dry: process.env.NODE_ENV === 'development'
        }),
        MomentLocalesPlugin({
            localesToKeep: ['es-us', 'en', 'es']
        }),
        new webpack.DefinePlugin({
            PKG_VRS: JSON.stringify(require("./package.json").version)
        }),
        prodOrDev(false, new webpack.HotModuleReplacementPlugin()),
        prodOrDev(false, new ReactRefreshWebpackPlugin()),
        !!process.env.ANALYZE_BUNDLE && new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: path.resolve(__dirname, 'server-report.html')
        })
    ].filter(Boolean)
});


export default [clientConfig];
