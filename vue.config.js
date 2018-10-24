/* eslint-disable no-unused-vars */
const manifestJSON = require("./public/manifest.json");

let pwaArgs = {
    themeColor: manifestJSON.theme_color,
    name: manifestJSON.short_name,
    msTileColor: manifestJSON.background_color
};

module.exports = {
// export default {
    baseUrl: '/web-app/',
    chainWebpack: config => {
        config.plugin("pwa").tap(args => {
            return [pwaArgs];
        });
    }
};