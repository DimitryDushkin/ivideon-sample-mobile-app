const yandexEnv = require('./utils/getYandexEnv'),
    isProduction = yandexEnv === 'production',
    isTesting = yandexEnv === 'testing',
    isBeta = yandexEnv === 'beta',
    isDevelopment = !(isProduction || isTesting || isBeta);

module.exports = {
    port: process.env.PORT || 5000,
    isProduction,
    isTesting,
    isDevelopment,
    isAuthDisabled: typeof process.env.DISABLE_AUTH === 'undefined' ? false : true
};
