// const { ModuleFederationPlugin } = require('webpack').container;
// const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // webpackConfig.plugins.push(
      //   new ModuleFederationPlugin({
      //     name: 'root-config',
      //     remotes: {
      //       'home-site': 'home-site@//localhost:3002/remoteEntry.js',
      //     },
      //     shared: {
      //       react: { singleton: true },
      //       'react-dom': { singleton: true },
      //     },
      //   })
      // );
      // webpackConfig.plugins.push(new ExternalTemplateRemotesPlugin());

      return webpackConfig;
    },
  },
};
