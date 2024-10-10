# Sync Expo Dependencies

A small tool that you can use to sync your expo dependencies with the ones specified as compatible in the expo SDK version you are using. It works by reading the `bundledNativeModules.json` from your locally installed Expo SDK, and thus it will never change it's output unless your installed SDK has changed.

There is also a check mode, which will only output the packages that are not in sync with the bundled native modules. This can be used in CI to make sure that the dependencies are always in sync.

## Usage

```bash
# Check mode
npx sync-expo-dependencies --check
```

```bash
# Update package.json and run npm install
npx sync-expo-dependencies
```
