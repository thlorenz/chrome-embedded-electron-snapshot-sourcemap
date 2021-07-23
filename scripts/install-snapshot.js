// @ts-check
'use strict'

// NOTE: this creates the snapshot from scratch, but since it depends on the Go esbuild binary which is only available
// for OSX for now this only can work on Mac.
// Alternatively ./install-snapshot.js uses the pre-bundled snapshot script and should work everywhere.

const path = require('path')
const fs = require('fs')
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
        sourcemapInline: true,
        sourcemapEmbed: true,
      }
    )
    // Using prefabricated script
    snapshotGenerator.snapshotScript = fs.readFileSync(
      require.resolve('../cache/snapshot')
    )
    await snapshotGenerator.makeSnapshot()
    snapshotGenerator.installSnapshot()
  } catch (err) {
    prettyPrintError(err, projectBaseDir)
    console.error(err)
  }
})()
