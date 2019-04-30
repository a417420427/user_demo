require('babel-register') ({
    presets: [ 'env' ],
    plugins: [
        ["transform-runtime", {
            "polyfill": false,
            "regenerator": true
          }]
    ]
})

const app = require('./app')