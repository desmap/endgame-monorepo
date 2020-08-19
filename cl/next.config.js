const path = require('path')

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/type-graphql$/, resource => {
        resource.request = resource.request.replace(
          /type-graphql/,
          'type-graphql/dist/browser-shim.js',
        )
      }),
    )

    // Important: return the modified config
    return config
  },
}
