// module.exports = function (api) {
//     api.cache(true);
//     return {
//         presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
//         plugins: [],
//     };
// };



module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./src'],
                    alias: {
                        '@': './src',
                    },
                },
            ],
        ],
    };
};
