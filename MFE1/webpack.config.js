const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");

module.exports = {
    entry: "./src/entry.js",
    mode: "development",
    devServer: {
        port: 3001,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
        }),
        new ModuleFederationPlugin({
            name: "MFE",
            filename: "remoteEntry.js",
            exposes: {
                "./Component1": "./src/Component1",
            },
            // Shared will contain all the libraries which our module depends on. It will be shared with portal app. Here it is telling that We want to use the following dependencies from the portal App
            // if the shared bundles like itwin ui react library bundle is used in portal app and imported and requesteed in code before its called from mfe , the same bundle will be used for mfe also instead of calling mfe port , othwise will fetch from mfe bundle port like loadable library bundle(its there in package.json but not imported and requested in code in portal app). no need to  call double times for the same bundled files
            // if the host does not have a dependency build imported  and requested in code prior to calling from mfe, the remote will download from its own build then , here it is happening with loadable library
            // if the library is imported in portal app and we remove here the ...dependencies , the mfe module will  download its dependency build from mfe port as it is not sharing the libraries from portal app now, so there will be 2 downloads of the same library now
            shared: {
                ...dependencies,
                react: { // these are always required for sharing the bundled libraries, these are common, should be used in every case, do not remove these
                    singleton: true,
                    requiredVersion: dependencies["react"],
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: dependencies["react-dom"],
                }
            },
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx"],
    },
    target: "web",
};