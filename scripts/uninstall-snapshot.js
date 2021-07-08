'use strict'

const path = require('path')
const { uninstallSnapshot } = require('v8-snapshot')

const projectBaseDir = path.join(__dirname, '../')

;(() => {
  try {
    uninstallSnapshot(projectBaseDir)
  } catch (err) {
    console.error(err)
  }
})()
