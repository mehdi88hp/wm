// module.exports = {
export default {
    root: true,
    env: {
        node: true,
        jquery: true,

        BASE_URL: '/',
        ApiBaseUrl: 'http://www.washmash.com/washmash_test/public',
        // ApiBaseUrl: 'http://127.0.0.1:8000',
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
