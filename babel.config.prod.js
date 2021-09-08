module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current"}}],
        "@babel/preset-typescript",
    ],
    plugins: [
        [
            "module-resolver",
            {
                alias: {
                    "@modules": "./dist/modules",
                    "@shared": "./dist/shared",
                    "@config": "./dist/config"
                }
            }
        ],
        "babel-plugin-transform-typescript-metadata",
        [
            "@babel/plugin-proposal-decorators",
            {
                legacy: true
            }
        ],
        [
            "@babel/plugin-proposal-class-properties",
            {
                loose: false
            }
        ],
        ["@babel/plugin-proposal-private-methods", { "loose": false }]
    ]
}