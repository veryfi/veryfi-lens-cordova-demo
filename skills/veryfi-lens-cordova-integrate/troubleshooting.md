# Troubleshooting

Use the symptom. Do not add a native call this plugin does not export. Field names are in [implementation.md](implementation.md). Platform splits are in [platforms.md](platforms.md).

## Camera never opens

- `init` only stores values. `showCamera` is the call that configures and presents.
- Android: empty `clientId` hits the error callback (`Expected one non-empty string argument.`) and does not present.
- Android Full: `credit_card` or `code` is rejected by the flavor check. The camera stays closed and there is no Lens delegate event. That is not a missing settings key.
- iOS: configure's success bool is ignored, so a bad credential can still attempt `showCamera`, then fail inside Lens (`invalid_credentials` when the SDK sends it).
- Events are strings. `JSON.parse` before reading `event`. A thrown parse means the payload was already an object or was not JSON. This plugin sends strings.
- Private git and Maven credentials must be present. Missing `MAVEN_VERYFI_URL`, `MAVEN_VERYFI_USERNAME`, or `MAVEN_VERYFI_PASSWORD` fails the Android build, not the camera callback.

## Events never arrive

One callback id is stored from `showCamera`. iOS `retryPackage` and `discardPackage` assign `command.callbackId` to that same `launchCallbackID`. A later retry or discard moves close, update, success, and error onto the retry callback. Do not invent a second listener.

Android camera events stay on the `showCamera` callback. Retry does not replace it.

Analytics is a different callback. Camera events are not delivered there.

## Wrong document or no extraction

The plugin does not switch binaries per document. `documentTypes` and `dataExtractionEngine` do.

- `"mobile"` only for `credit_card`, `code`, `barcode`.
- Credit card data stays on device. There is no backend card payload to parse.
- More than one type needs `showDocumentTypes: true`.
- `"custom"` is in the README and is not an iOS engine value.
- OCR caps versus strips is `ocrType` `caps` or `strips` with `documentTypes: ["code"]`. Android Full rejects `code`.
- Checks do not gain TIFF from a setting on this Full link.

## Gallery, files, or upload

There is no `showGallery`, `showDocumentBrowser`, or `uploadImages`. `galleryIsOn` and `showBrowserButton` are in-camera. `browseIsOn` does nothing useful while `moreMenuIsOn` is false.

Headless products are unsupported. Do not approximate them with `showCamera`.

## Retry does nothing or camera events stop

Match [platforms.md](platforms.md). JavaScript accepts only the package id. iOS native reads metadata and `imageSourceTag` from argument indexes the JS function does not send, and it steals the camera callback. Android retries with the id only. Do not add parameters to the call.

## `showInfoButton` shows nothing or a blank native view

Expected. The setting is a `VeryfiInfoView` or an Android `Fragment`, not a Cordova page. A boolean does not install the host's HTML. See [unbridged.md](unbridged.md).

## Local files disappear

Default native behavior deletes package files after processing. Set `autoDeleteLocalResourcesAfterProcessing` false when the host must read `data` paths later. Call `getFileBase64` with the update object while the file exists. `clearLensStorage()` is not bridged. `discardPackage` does not delete retained images.

## Photos fill up

`backupDocsToGallery` was left at the native default true, or `moreMenuIsOn` is true and the user turned backup on. Set both backups false and the More menu false.

## Stale README

| README says | Source says |
|-------------|-------------|
| Android min SDK 21 | `plugin.xml` `android-minSdkVersion` 23 |
| `dataExtractionEngine` `custom` | iOS decoder accepts `api`, `mobile`, `none` |
| `retryPackage` can take extra data | `veryfi.js` sends only the id |

## Install failures

SSH access to the Bitbucket plugin repo, and the three Maven environment variables. This skill does not store those secrets.
