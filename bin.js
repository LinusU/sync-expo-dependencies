#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'

import { readExpoDependenciesStatus } from './index.js'
import { cwd } from 'node:process'

if (process.argv.includes('--help')) {
  console.error('Usage: synx-expo-dependencies [--check]')
} else if (process.argv.includes('--check')) {
  const { actual, expected, isInSync } = await readExpoDependenciesStatus(cwd())

  if (!isInSync) {
    process.exitCode = 1
    console.error('❌ Dependencies are out of sync:\n')

    for (const key of Object.keys(actual)) {
      if (actual[key] !== expected[key]) {
        console.error(`Expected ${key} to be ${expected[key]}, but found ${actual[key]}`)
      }
    }
  } else {
    console.error('✅ Dependencies are in sync')
  }
} else {
  const { actual, expected, isInSync } = await readExpoDependenciesStatus(cwd())

  if (!isInSync) {
    let packageJson = await readFile('package.json', 'utf8')

    for (const key of Object.keys(actual)) {
      if (actual[key] !== expected[key]) {
        console.error(`🔧 Updating ${key} from ${actual[key]} to ${expected[key]}`)
        packageJson = packageJson.replaceAll(`"${key}": "${actual[key]}"`, `"${key}": "${expected[key]}"`)
      }
    }

    console.error('🔧 Writing package.json')
    await writeFile('package.json', packageJson)

    console.error('🔧 Running npm install')
    spawnSync('npm', ['install'], { stdio: 'inherit' })
  } else {
    console.error('✅ Dependencies are in sync')
  }
}
