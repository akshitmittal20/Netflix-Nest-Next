// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      // Add .jsx to module extensions
      config.resolve.extensions.push('.jsx');
      return config;
    },
  };
  