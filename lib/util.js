'use strict'

const fs = require('fs')

const COMMENT1 =
  'This is just included to demonstrate the snapshot related rewrite that is performed'
function getFileSize() {
  return fs.readFileSync(__filename).byteLength
}

const COMMENT2 = `
Via 'prepareStackTrace' override the stack is mapped using the same sourcemap that is inlined
at the bottom of the snapshot bundle. (see Console log)
I would expect DevTools to show './lib/util.js:19' in a separate tab when the 'debugger'
statement hits
`
function add(a, b) {
  console.log(new Error('Should be ./lib/util.js:18.20').stack)
  debugger
  return a + b
}

module.exports = { add, getFileSize, COMMENT1, COMMENT2 }
