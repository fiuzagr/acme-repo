const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // FIXME fix publicPath to work with Module Federation and SPA routes
      // webpackConfig.output.publicPath = 'auto';

      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: 'acme_home_site',
          filename: 'remote-entry.js',
          exposes: {
            './app': './src/app',
          },
          shared: {
            ...deps,
            react: { singleton: true, requiredVersion: deps['react'] },
            'react-dom': {
              singleton: true,
              requiredVersion: deps['react-dom'],
            },
            'react-router-dom': {
              singleton: true,
              requiredVersion: deps['react-router-dom'],
            },
          },
        })
      );

      return webpackConfig;
    },
  },
};
