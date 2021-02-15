module.exports = function (api) {
    api.cache(true)
    return {
        plugins: [
            [
                'module:react-native-dotenv',
                {
                    moduleName: '@env',
                    path: './config/.env',
                    blacklist: null,
                    whitelist: null,
                    safe: false,
                    allowUndefined: true,
                },
            ],
        ],
        presets: ['babel-preset-expo'],
    }
}
