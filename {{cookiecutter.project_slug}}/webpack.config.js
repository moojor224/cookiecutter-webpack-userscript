const path = require("path");
const WebpackUserscript = require("webpack-userscript");
const dev = process.env.NODE_ENV === "development";

module.exports = {
    mode: dev ? "development" : "production",
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "{{cookiecutter.project_slug}}.user.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "dist")
    },
    plugins: [
        new WebpackUserscript.UserscriptPlugin({
            headers(original) {
                if (dev) {
                    return {
                        ...original,
                        version: `${original.version}-build.[buildNo]`
                    };
                }

                return {
                    ...original,
                    name: "{{cookiecutter.project_name}}",
                    description: "",
                    grant: [],
                    match: []
                };
            }
        })
    ]
};
