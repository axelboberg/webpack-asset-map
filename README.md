# webpack-asset-map

A small Webpack-plugin for creating a JSON-file containing the name of bundled assets

## Usage

```javascript
const AssetMap = require('webpack-asset-map')
 
module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new AssetMap(options)
  ]
}
```

### Options

#### `options.filename?`  
  
Type: `String`  
Default: `assets.json`  

#### `options.path?`  
  
Type: `String`  
Default: The output-path specified in webpack.config.js  
  
The relative path from `webpack.config.js` to the directory where the JSON-file will be created. Will overwrite if the file already exists.

#### `options.data?`

Type: `Object`  
Default: An empty object

Additional data to be written to the file, can be used to overwrite existing values