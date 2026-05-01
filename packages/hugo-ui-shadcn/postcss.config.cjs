const plugins = {};

try {
  require.resolve('@tailwindcss/postcss');
  plugins['@tailwindcss/postcss'] = {};
} catch {}

try {
  require.resolve('autoprefixer');
  plugins.autoprefixer = {};
} catch {}

module.exports = { plugins };
