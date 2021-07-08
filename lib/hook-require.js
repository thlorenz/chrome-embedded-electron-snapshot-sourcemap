// @ts-check
'use strict'
const path = require('path')

const _ = require('v8-snapshot').snapshotRequire(
  path.resolve(__dirname, '..'),
  {
    diagnostics: true,
    useCache: true,
  }
)
