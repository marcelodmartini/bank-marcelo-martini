/**
 * This configuration file extends the default behavior of webpack inside a Next.js application.
 * 
 * @module webpackConfig
 */

module.exports = {
  /**
   * Customize the Webpack configuration.
   *
   * @param {Object} config - The original webpack configuration provided by Next.js.
   * @returns {Object} The updated webpack configuration.
   */
  webpack: (config) => {
    // Disables the expression context critical warning in Webpack.
    // This is useful if you're seeing a lot of warnings or errors about the dynamic imports and contexts.
    config.module.exprContextCritical = false;

    return config;
  },
};
