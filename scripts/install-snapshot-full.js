// @ts-check

'use strict'
const path = require('path')
const { SnapshotGenerator, prettyPrintError } = require('v8-snapshot')

const projectBaseDir = path.join(__dirname, '../')
const snapshotEntryFile = require.resolve('../lib/util.js')

const cacheDir = path.resolve(__dirname, '../cache')

;(async () => {
  try {
    const snapshotGenerator = new SnapshotGenerator(
      projectBaseDir,
      snapshotEntryFile,
      {
        cacheDir,
        minify: false,
        nodeModulesOnly: false,
      }
    )
    await snapshotGenerator.createScript()
    await snapshotGenerator.makeSnapshot()
    snapshotGenerator.installSnapshot()
  } catch (err) {
    prettyPrintError(err, projectBaseDir)
    console.error(err)
  }
})()
