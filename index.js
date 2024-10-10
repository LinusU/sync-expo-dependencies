import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

async function loadJsonFile (path) {
  return JSON.parse(await readFile(path, 'utf8'))
}

export async function readExpoDependenciesStatus (projectDirectory) {
  const expo = await loadJsonFile(join(projectDirectory, 'node_modules/expo/bundledNativeModules.json'))
  const local = (await loadJsonFile(join(projectDirectory, 'package.json'))).dependencies

  const actual = {}
  const expected = {}
  let isInSync = true

  for (const expoPackageName of Object.keys(expo)) {
    if (expoPackageName in local) {
      actual[expoPackageName] = local[expoPackageName]
      expected[expoPackageName] = expo[expoPackageName]

      if (actual[expoPackageName] != expected[expoPackageName]) {
        isInSync = false
      }
    }
  }

  return { actual, expected, isInSync }
}
