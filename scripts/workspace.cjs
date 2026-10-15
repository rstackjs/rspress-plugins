const fs = require('node:fs');
const path = require('node:path');

const packagesDir = path.resolve(__dirname, '../packages');

const publishPackages = fs.readdirSync(packagesDir);

module.exports = {
  packages: publishPackages,
  scopes: publishPackages.map((p) => p.replace('rspress-', '')),
};
