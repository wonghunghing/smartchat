//Refer to puppeteer documentation regarding headless chromium cache location setup.
//For the purpose of puppeteer chromium .cache location in Linux to avoid mis-location.
const {join} = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};