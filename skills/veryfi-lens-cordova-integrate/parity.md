# API parity

"Yes" means the method is in `www/veryfi.js` and a native handler exists. The native SDK method can still exist when this column says No. Those are port candidates, not host calls. See [unbridged.md](unbridged.md).

## Presentation and lifecycle

| Call | Cordova | Native iOS UI SDK | Native Android UI SDK |
|------|---------|-------------------|------------------------|
| Store credentials | `Lens.init` | — | — |
| Configure | Inside `showCamera` | `configure(with:settings:completion:)` | `configure(application, credentials, settings) { ok -> }` |
| Camera | `showCamera` | `showCamera(in:)` | `showCamera()` |
| Gallery as its own screen | No | `showGallery(in:)` | `showGallery()` |
| Document browser | No | `showDocumentBrowser(in:)` | `showDocumentBrowser()` |
| Close camera | No | `closeCamera` path on the presenter | `closeCamera()` |
| UI SDK `uploadImages` | No | `uploadImages(paths:)` | `uploadImages(uris/paths, isSameTransaction)` |
| iOS `headlessUpload` | No | Yes, in memory, not Headless | No |
| Headless `process` | No | Headless binary only | Headless binary only |
| Delegate | One `showCamera` success callback, JSON string, `event` field | `VeryfiLensDelegate` | `VeryfiLensDelegate` |
| Analytics | `observeAnalyticsEvents` | `VeryfiLensAnalyticsEvent` | Secure analytics broadcast |
| Retry one | `retryPackage(id)` | `utils.retryPackage(id, metadata, imageSourceTag)` | `retryUpload(id)` |
| Retry all | Yes | Yes | `retryAll()` |
| Discard one / all | Yes | `utils.discardPackage` / `discardAllPackages` | `discardUpload` / `discardAll` |
| Share OCR feedback | Yes | `shareOCRFeedback` | `shareOCRFeedback` |
| File base64 | `getFileBase64(objectWithData)` | `utils` base64 helper | Plugin reads the file itself |
| Help button event | No | `onHelpButtonClicked` | `onHelpButtonClicked` |
| `clearLensStorage` | No | `utils.clearLensStorage()` | Android storage clear exists on the SDK and is not wrapped |

## Retry mismatch

| | iOS bridge | Android bridge |
|--|------------|----------------|
| Arguments JS sends | The id string only, as the `exec` args value | Same string; Java reads `args.getString(0)` |
| What native wanted | Package id, metadata dictionary, image source tag | Package id |
| Callback | Replaces `launchCallbackID` | Does not replace the camera callback |

## Events

| Native | Cordova `event` |
|--------|-----------------|
| `veryfiLensClose` | `veryfi_lens_close` |
| `veryfiLensUpdate` | `veryfi_lens_update` |
| `veryfiLensSuccess` | `veryfi_lens_success` |
| `veryfiLensError` | `veryfi_lens_error` |
| Analytics | `observeAnalyticsEvents` callback, not the camera `event` |
| `onHelpButtonClicked` | No |

## Settings

A dictionary into `VeryfiLensSettings`. No typed settings class in JavaScript. CamelCase keys. Details: [settings-catalog.md](settings-catalog.md).

## Products

| Product | This plugin |
|---------|-------------|
| Full UI, then a recipe | Current path |
| Receipts, long receipts, checks, business cards, barcodes, W-2, W-9 | Settings on Full, if that platform's Full binary allows the type |
| Credit cards, OCR strips, OCR caps | Settings exist. Android Full rejects the type. iOS Full embedding Unconfirmed |
| Lite / App Clip | **Unsupported** |
| Headless receipts, Headless credit cards | **Unsupported** |
| Remote Models, check TIFF | **Not current.** Planned |
| iOS `headlessUpload` | **Unsupported** |
