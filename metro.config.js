const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const exclusionList = require('metro-config/src/defaults/exclusionList');
const config = {
    resolver: {
        blacklistRE: exclusionList([
            /ios\/Pods\/JitsiMeetSDK\/Frameworks\/JitsiMeet.framework\/assets\/node_modules\/react-native\/.*/,
            /app\/.*/
        ])
    }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
