module.exports = {
  webpack: (config) => {
    // Desactivar comprobación de errores
    config.module.exprContextCritical = false;

    return config;
  },
};
