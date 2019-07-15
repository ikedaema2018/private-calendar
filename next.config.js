const withSass = require('@zeit/next-sass');
module.exports = withSass({
  cssModules: true,
});
const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript()