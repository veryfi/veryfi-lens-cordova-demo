# Pinned source

Read this tree. Do not bump it from this skill. Do not edit it from this skill.

| | |
|--|--|
| Plugin | Cordova |
| Path | `/Users/veryfij/plugins/veryfi-lens-cordova-plugin-androidx` |
| Commit | `5d197c585c50389bbf830b48352825c31f776919` |
| npm name | `@veryfi/cordova-plugin-veryfi-lens` |
| Version | `2.6.60` (`package.json`, `plugin.xml`) |
| JS | `cordova-plugin-veryfi-lens/www/veryfi.js` |
| iOS bridge | `cordova-plugin-veryfi-lens/src/ios/Veryfi.m` |
| Android bridge | `cordova-plugin-veryfi-lens/src/android/Veryfi.java` |
| Android Gradle | `cordova-plugin-veryfi-lens/src/android/Veryfi.gradle` |
| iOS package | `cordova-plugin-veryfi-lens/Package.swift` |
| Manifest of the plugin | `cordova-plugin-veryfi-lens/plugin.xml` |

| Platform | Linked Lens |
|----------|-------------|
| iOS | `https://repo.veryfi.com/shared/lens/veryfi-lens-spm.git` from `3.0.13` |
| Android | `com.veryfi.lens:veryfi-lens-sdk:2.6.0.15` |

`veryfi-lens-spm.git` is the Full UI package. The Android coordinate has no flavor suffix and is the Full UI artifact.

## What was read

- Public methods on `Lens` in `veryfi.js`
- iOS configure, show camera, retry, discard, analytics, base64, and the four delegate methods
- Android `execute` actions, `configure` without a completion lambda, `showCamera`, retry, analytics broadcast, base64
- `plugin.xml` usage strings, min SDK 23, target SDK 35
- Package and Gradle coordinates

## Not verified by unpacking or running

- Models embedded in the resolved `VeryfiLens.xcframework`
- Android `initWithJsonObject` for every recipe key on `2.6.0.15`
- Flavor-checker strings on `2.6.0.15` (Full rules are taken from the Android SDK contract at `2.7.0.4`; see [clarifications.md](clarifications.md))
- That `cordova plugin add` succeeds without the private SSH key and Maven env
- Device behavior of barcode JSON on Android

## Validate

From the repo root, the folder is self-contained when every relative link resolves inside `.cursor/veryfi-lens-cordova-integrate` and no link uses `..`.

```sh
python3 .cursor/veryfi-lens-cordova-integrate/scripts/validate.py
```

## Files in this pack

- [SKILL.md](SKILL.md)
- [install.md](install.md)
- [syntax.md](syntax.md)
- [platforms.md](platforms.md)
- [implementation.md](implementation.md)
- [recipes.md](recipes.md)
- [settings-groups.md](settings-groups.md)
- [settings-catalog.md](settings-catalog.md)
- [conflicts.md](conflicts.md)
- [clarifications.md](clarifications.md)
- [troubleshooting.md](troubleshooting.md)
- [parity.md](parity.md)
- [unbridged.md](unbridged.md)
- [sources.md](sources.md)
- [templates/full.md](templates/full.md)
- [templates/receipts.md](templates/receipts.md)
- [templates/long-receipts.md](templates/long-receipts.md)
- [templates/checks.md](templates/checks.md)
- [templates/credit-cards.md](templates/credit-cards.md)
- [templates/business-cards.md](templates/business-cards.md)
- [templates/barcodes.md](templates/barcodes.md)
- [templates/ocr-code-strips.md](templates/ocr-code-strips.md)
- [templates/ocr-code-caps.md](templates/ocr-code-caps.md)
- [templates/w2.md](templates/w2.md)
- [templates/w9.md](templates/w9.md)
- [templates/any-documents.md](templates/any-documents.md)
