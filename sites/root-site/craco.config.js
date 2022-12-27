const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
  webpack: {
    configure: (webpackConfig, { paths }) => {
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: 'acme_root_site',
          remotes: {
            '@acme/home-site': 'acme_home_site@//localhost:7001/remoteEntry.js',
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
