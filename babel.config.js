// module.exports = function (api) {
//     api.cache(true);
//     return {
//         presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
//         plugins: [],
//     };
// };



// babel.config.js
module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            'babel-preset-expo',
            '@babel/preset-typescript'
        ],
        plugins: [
            'react-native-reanimated/plugin'
        ]
    };
};