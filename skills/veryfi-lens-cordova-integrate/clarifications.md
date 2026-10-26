# Clarifications

Anything not confirmed in the pinned Cordova sources or in the native UI SDK contracts is **Unconfirmed**. Leave it out of host code or say so next to the line that depends on it.

## Plugin source, confirmed

- Version `2.6.60`. iOS SPM `veryfi-lens-spm` from `3.0.13`. Android `com.veryfi.lens:veryfi-lens-sdk:2.6.0.15`. Min SDK 23 in `plugin.xml`.
- `init` stores arguments. `showCamera` configures and presents.
- iOS ignores the configure completion `BOOL`.
- Android `configure` has no completion lambda in this plugin, then `showCamera()`.
- Events are JSON strings with an `event` field.
- `getFileBase64` reads `data`.
- JS `retryPackage` sends only the id. iOS reads three argument indexes and replaces `launchCallbackID`. Android retries by id.
- No `showGallery`, `showDocumentBrowser`, `closeCamera`, `uploadImages`, Headless, or Lite symbols in the public JS or the native plugin classes that were read.

## Unconfirmed

| Item | Why |
|------|-----|
| Models inside the iOS Full XCFramework beyond receipts, invoices, and `other` | Not unpacked. Contact support before `long_receipt`, `check`, cards, `barcode`, `code`, `w2`, `w9`, or an Any-Documents template |
| Android flavor gate on exactly `2.6.0.15` | The Full matrix (no `CREDIT_CARD`, no `CODE`; other listed types allowed) is confirmed on Android SDK `2.7.0.4`. This AAR is older. Do not promise a type the newer Full artifact rejects. Do not promise a type only because a newer Full artifact allows it, without a device check, if the host is blocked |
| `initWithJsonObject` for every recipe key, including `ocrType`, `continuousAutoFocus`, `backupDocsToiCloud`, check validators | Not executed against this AAR |
| Barcode and OCR success field names on Android | iOS forwards `BarcodeResult` / `OCRResult` without the package envelope. Android field list was not read from this AAR |
| Winner if `closeCameraOnSubmit` and `submitWithoutClose` are both true | Native behavior still open |
| `customLensStrings` through the Android JSON initializer | iOS dictionary mechanism. Android strings are resources |
| Contacts, Calendar, speech, and microphone usage strings | `plugin.xml` merges them. Current recipes do not use those features. Treat the features as stale |
| Whether Android drops unknown JSON keys or throws | Settings errors are caught and reported; configure still proceeds |

## iOS and Android differences that change this plugin

| Topic | iOS | Android |
|-------|-----|---------|
| Failure `status` | `fail` | `failed` |
| Configure result | Completion bool exists natively and this plugin ignores it | Completion bool exists natively and this plugin does not pass a lambda |
| Invalid credentials | Delegate `msg` `invalid_credentials` when the SDK emits it | No `invalid_credentials` event. Empty client id is the plugin's own error string. Other failures are a Toast and a false configure result the plugin does not forward |
| More menu | Hiding it drops stored overrides | Menu on replaces host values on later configure |
| Info UI | `VeryfiInfoView` | `Fragment` |
| iCloud backup | `backupDocsToiCloud` | No equivalent |
| `utils`, SwiftUI, share extension, `headlessUpload` | Native iOS only, not bridged | Not on Android |
| Check TIFF paths | Remote Models | Remote Models. Not this AAR |
| Gallery backup default | True | True |
| `glareDetectionIsOn` default | Leave false unless requested | Default true |
| `dictateIsOn` default | Leave false | Default true |
| `packageMaxScans` default | Recipe sets 10 for receipts | Native default 5 |
| `autoRotateIsOn` / skew / clean border | Recipes set them for paper documents | Native defaults false |
| Hybrid crop layout | `cropLayoutWithAutoDetection` alone | Also set `cropLayoutIsOn` |

## Unsupported

- Headless Receipts and Headless Credit Cards
- Lite and App Clip
- A current Remote Models dependency, including check TIFF
- Host-authored `VeryfiInfoView` or Android info `Fragment`
- `dataExtractionEngine: "custom"`
- Partner dictation (`dictateIsOn`)
- Using this skill to patch `Veryfi.m` or `Veryfi.java`

Native methods in [unbridged.md](unbridged.md) exist on the SDKs and could be ported into the plugin. Until that ships, they are unavailable from Cordova.
