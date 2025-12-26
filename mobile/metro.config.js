const { withNativeWind } = require("nativewind/metro");
const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname);

// Ensure platform-specific extensions are resolved properly
config.resolver = {
  ...config.resolver,
  sourceExts: [...(config.resolver?.sourceExts || []), 'native.tsx', 'native.ts'],
};

module.exports = withNativeWind(config, { input: "./global.css" });