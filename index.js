/**
 * Axel Boberg © 2018
 */

const path = require('path')
const fs = require('fs')

/**
 * Initiate options with default values
 */
let _options = {
  filename: 'assets.json',
  path: null, // Where to place the asset-map file: Will use the output defined in the compiler by default
  webpack: {
    output: null // Where the bundled files are located: Will be set inside the compiler-hook
  }
}

function plugin (options) {
  _options = Object.assign(_options, options)
}

/**
 * Wrapper for writing data to a file asynchronously
 * @param {String} path The path to the file to be written
 * @param {String} data Data as a string to write to the file
 * @returns {Promise}
 */
function writeToFile (path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, {encoding: 'utf8'}, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}

/**
 * Webpack-handler
 * @param {Object} compiler A Webpack-compiler object
 */
plugin.prototype.apply = function (compiler) {
  _options.webpack.output = compiler.options.output.path
  if (!_options.path) _options.path = _options.webpack.output

  /**
   * Listen to the 'done' hook,
   * fired by the compiler
   */
  compiler.hooks.done.tap('webpack-asset-map', stats => {
    const fileData = JSON.stringify({
      hash: stats.compilation.hash,
      assets: Object.keys(stats.compilation.assets)
    })

    /**
     * Write the desired data to a file,
     * using the path and filename specified in options
     */
    writeToFile(path.join(_options.path, _options.filename), fileData)
      .catch(err => {
        throw err
      })
  })
}

module.exports = plugin
