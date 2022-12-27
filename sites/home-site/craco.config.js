const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.publicPath = 'auto';

      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: 'acme_home_site',
          filename: 'remoteEntry.js',
          exposes: {
            './App': './src/App',
          },
          shared: {
            ...deps,
            react: { singleton: true, requiredVersion: deps['react'] },
            'react-dom': {
              singleton: true,
              requiredVersion: deps['react-dom'],
            },
          },
        })
      );

      return webpackConfig;
    },
  },
};
