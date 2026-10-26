# iOS and Android behavior

One JavaScript settings object hits two native SDKs. The bridges are not the same, and the Full binaries are not the same product matrix. Generate host code that is safe on **both**, and say which platform still cannot do the thing the host asked for.

Versions in this commit: iOS SPM `veryfi-lens-spm` from `3.0.13`, Android `com.veryfi.lens:veryfi-lens-sdk:2.6.0.15`. Android product rules below are the Lens Android Full artifact contract (confirmed in the Android SDK at `2.7.0.4`). The Cordova AAR is one minor series older. Treat a behavior that depends on that gap as **Unconfirmed** for `2.6.0.15` and do not promise it. See [clarifications.md](clarifications.md).

## Linked binary

| | iOS | Android |
|--|-----|---------|
| Package | `veryfi-lens-spm.git` (Full UI) | `veryfi-lens-sdk` (Full UI, no flavor suffix) |
| How a recipe selects a product | `documentTypes` on that binary | Same, then `FlavorCheckerHelper` |
| `credit_card`, `code` | Whether this Full XCFramework embeds those models is **Unconfirmed**. Contact support before shipping | Full does **not** allow `CREDIT_CARD` or `CODE`. The camera does not open (Toast "Please use only valid document types", no delegate callback) |
| `long_receipt`, `check`, `business_card`, `barcode`, `w2`, `w9`, `any_document` and Any-Documents shortcuts | Model embedding in this Full package is **Unconfirmed** beyond receipts, invoices, and `other`. Contact support | Full allows `LONG_RECEIPT`, `CHECK`, `BUSINESS_CARD`, `BARCODE`, `W2`, `W9`, `ANY_DOCUMENT`, plus passport, driver license, nutrition facts, shipping label, prescription label, insurance card, invoice, receipt, other, bank statement |
| Lite | Unsupported. Not linked | Unsupported. Not linked. Native Lite is a Play Feature module, not an App Clip |
| Headless | Unsupported. Not linked | Unsupported. Separate artifacts |
| Remote Models | Not this SPM URL. Planned | Not this Maven coordinate. Planned. Native Remote Models is the size recommendation and the check-TIFF download path |

A missing native wrapper can be ported later. Shipping a second flavor inside the host app is not a port, and this plugin's Gradle and Package.swift already pin Full. Do not add another Lens dependency beside it.

## Bridge mismatches

| Step | iOS `Veryfi.m` | Android `Veryfi.java` |
|------|----------------|------------------------|
| `init` | Not native. JS stores arguments | Same |
| Configure | `configureWith:settings:completion:` then **ignores** the `BOOL` and always `showCameraIn:` on the key window root | `configure(application, credentials, settings)` **without** a completion lambda, then `showCamera()` |
| Empty client id | No JS/native guard in `showCamera` | Error callback: `Expected one non-empty string argument.` Camera is not opened |
| Bad settings JSON | `initWith:` dictionary | `initWithJsonObject`; error callback `Settings error: …` but configure still runs with the settings object caught mid-assign |
| Delegate | `VeryfiLens.shared.delegate = self` after configure is invoked | New `VeryfiLensDelegate` set before `showCamera` |
| Camera events | JSON **string**, `event` added, `keepCallback`, sent to `launchCallbackID` | JSON **string**, `event` added, `keepCallback`, sent to the `showCamera` callback |
| `retryPackage` | Reads arguments 0, 1, and 2 (`packageID`, metadata, `imageSourceTag`). JS sends only the id string, so indexes 1 and 2 are absent. Also **replaces** `launchCallbackID`, so a retry steals the camera callback | `retryUpload(id)` only. Does not read metadata or a tag. Does not replace the camera callback |
| `discardPackage` | `utils.discardPackageWith:` and also replaces `launchCallbackID` | `discardUpload(id)` |
| Analytics | `NSNotification` `VeryfiLensAnalyticsEvent`. Forwards that JSON. Separate callback id | Secure broadcast `com.veryfi.lens.VeryfiLensSecureAnalyticsEvent`. Builds `{ event, params }` |
| `getFileBase64` | Reads `data`, returns base64 on **that** command's callback (does not steal launch) | Reads `data` (and `msg` for a log), `callbackContext.success` |
| Help / info view | Settings map cannot construct a `VeryfiInfoView`. No `onHelpButtonClicked` export | Settings map cannot construct a `Fragment`. No help callback |

Do not paper over retry by adding JavaScript parameters `veryfi.js` does not declare. Say the iOS retry path does not receive metadata or an image-source tag, and that calling it can detach camera events.

## Native limits the bridge inherits

### Configure success is not visible

Native iOS wants the host to present only after `completion(true)`. Native Android wants `showCamera()` only inside `configure { ok -> if (ok) … }`. An unusable Android configuration yields `ok == false` and/or a Toast, and Android has **no** `invalid_credentials` delegate error. This plugin never forwards that bool. The host cannot gate `showCamera` on it. If the camera never opens, check credentials and `documentTypes` against the Full artifact rather than adding a fictional completion callback.

### Failure status string

iOS package failures use `status` `"fail"`. Android uses `"failed"`. The plugin does not rename `status`. Read both when the host runs on both stores.

### Document types

Strings in the dictionary: `receipt`, `invoice`, `other`, `long_receipt`, `check`, `credit_card`, `business_card`, `barcode`, `code`, `w2`, `w9`, `any_document`. Android maps them to `DocumentType`. More than one type needs `showDocumentTypes: true` or the user cannot switch.

`"mobile"` (`inApp` / `VeryfiInApp`) extracts on device only for `credit_card`, `code`, and `barcode`. Other types use `"api"` or `"none"`. Android `configure` forces in-app when the first type is `CREDIT_CARD`; that force does not make Full accept the type.

### More menu

`moreMenuIsOn: true` lets end users persist overrides for auto capture, blur, glare, auto torch, gallery backup, close-camera-on-submit, and batch upload. On Android, a later `configure` **replaces the host values** with those stored overrides when the menu is on and the user has opened Lens before. On iOS, hiding the menu discards those stored overrides. Keep `moreMenuIsOn` false unless end users should own the toggles. `moreSettingsMenuIsOn` is a separate More > Settings entry. It does not reset those overrides. Keep it false.

`browseIsOn` only adds Browse inside that More menu. With the menu off, Files need `showBrowserButton: true` or `galleryIsOn` plus `galleryButtonWithFilesIsOn`. This plugin cannot call `showDocumentBrowser`.

### Backups and privacy

Set `backupDocsToGallery` false. The native default is true. Set `backupDocsToiCloud` false on iOS. Android has no iCloud flag; passing the key is for the iOS decoder. Android acceptance of iOS-only keys is **Unconfirmed** (unknown keys are expected to be ignored, not verified against this AAR).

`glareDetectionIsOn` defaults true on Android and is a suboptimal algorithmic gate. The base recipe sets it false. Leave it false unless the host explicitly wants that gate.

`dictateIsOn` defaults true on Android and is obsolete. The base recipe sets it false.

### Colors and custom UI

Pass colors as hex strings (`#FFFFFFFF`), not `UIColor` objects. `customLensStrings` is an iOS dictionary. Android string overrides are resource merges, not that dictionary. **Unconfirmed** whether `initWithJsonObject` applies `customLensStrings`.

`showInfoButton` and `cameraInfoView` stay unbridged on both platforms. See [unbridged.md](unbridged.md).

### Check TIFF and size

`retrieveCheckTiffIsOn` belongs to native Remote Models, which this plugin does not link. Do not promise TIFF paths (`img_check_front_tiff_path`, `img_check_back_tiff_path`).

Measure installed size on the final build, with Lens and without it. [SDK binary sizes](https://docs.veryfi.com/lens/mobile/settings/sdk_binary_sizes/).

### Paid detection

`fraudDetectionIsOn` needs the paid backend entitlement (`detect_fraud_on` on Android's account check). `documentFieldsToDetect` needs the entitlement **and** the Field Detection, Remote Models, or Lite flavor. This plugin's Full link is not those flavors. The setting alone stays off.
