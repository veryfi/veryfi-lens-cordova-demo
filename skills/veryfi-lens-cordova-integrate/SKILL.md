---
name: veryfi-lens-cordova-integrate
description: >-
  Integrates the Veryfi Lens Cordova plugin (cordova.plugins.Veryfi.Lens,
  @veryfi/cordova-plugin-veryfi-lens): Full UI SDK install, credentials, camelCase
  settings recipes, showCamera JSON-string events, file base64, and the iOS versus
  Android bridge mismatches. Use when adding Veryfi Lens to a Cordova or
  Ionic-Cordova app, wiring Lens callbacks, or capturing receipts, long receipts,
  checks, credit cards, business cards, barcodes, OCR strips or caps, W-2, W-9,
  or Any-Documents through this plugin.
---

# Veryfi Lens Cordova integration

Walk a Cordova host from plugin install to a working first scan. Prefer the **fewest** settings. Do not invent JavaScript methods, event names, or settings keys.

This folder is standalone. It does not require another skill pack. Product meaning comes from the native Lens UI SDK. Call shape comes from the pinned Cordova plugin only.

The plugin links the **Full** UI SDK on both platforms. There is no second Cordova package for Receipts, Checks, Credit Cards, OCR, Barcodes, W-2, W-9, Lite, Headless, or Remote Models. A document choice is a settings dictionary on that Full binary, and only when that binary actually accepts the type. See [platforms.md](platforms.md).

**Guided** is the recommended path. **Quick** is a first scan when the document type is already obvious.

Public settings are a plain object of camelCase Lens keys. Do not construct `VeryfiLensSettings`, `VeryfiLensReceiptsSettings`, or any `VeryfiLens*Settings` subclass in the host. The native bridge builds `VeryfiLensSettings` from the object.

## Pick a workflow

### Quick

The host already named the document. Ask nothing else. Apply base hardening plus one template, then write the assumptions.

```
Cordova Lens quick:
- [ ] Map the request to one template
- [ ] Confirm the linked Full binary can accept that document type (platforms.md)
- [ ] Install (install.md) — private git + Android Maven env
- [ ] init(false, url, clientId, username, apiKey, settings)
- [ ] showCamera is the call that configures and presents
- [ ] JSON.parse the success string; switch on event
- [ ] Run conflicts.md
```

### Guided

Ask only what is missing, in one message:

1. **Documents** — receipt/invoice, long receipt, check, credit card, business card, barcode, code on a strip or bottle cap, W-2, W-9, or an Any-Documents template?
2. **Extract** — Veryfi Cloud (`"api"`), on-device (`"mobile"`, only credit card / code / barcode), or the customer processes later (`"none"`)?
3. **UX** — review then submit, auto-submit, or batch until a max then review?
4. **After capture** — keep local package files, or let Lens delete them?

Defaults when the user does not answer: Cloud API, review-then-submit, camera plus in-camera gallery, backups off, More menu off, local files deleted by Lens after one sequential document.

## Checklist

```
Cordova integrate:
- [ ] Intake (quick assumptions or guided answers)
- [ ] Full binary vs document type
- [ ] Install + credentials
- [ ] Base + one recipe
- [ ] Conflict check
- [ ] init, then showCamera
- [ ] Handle close / update / success / error
- [ ] File copy or getFileBase64 before Lens deletes paths
```

Read one level deep:

| Need | File |
|------|------|
| Install, plist, Maven, versions | [install.md](install.md) |
| `init`, `showCamera`, events, other calls | [syntax.md](syntax.md) |
| iOS bridge vs Android bridge | [platforms.md](platforms.md) |
| Callbacks, files, entry points | [implementation.md](implementation.md) |
| Base + recipe objects | [recipes.md](recipes.md) |
| Setting groups | [settings-groups.md](settings-groups.md) |
| Key meanings | [settings-catalog.md](settings-catalog.md) |
| Incompatible flags | [conflicts.md](conflicts.md) |
| Unconfirmed items | [clarifications.md](clarifications.md) |
| Symptom → check | [troubleshooting.md](troubleshooting.md) |
| Methods this plugin does and does not export | [parity.md](parity.md) |
| Native APIs that could be ported | [unbridged.md](unbridged.md) |
| Pinned commit | [sources.md](sources.md) |

| Product | Template |
|---------|----------|
| Full / widest UI on this binary | [templates/full.md](templates/full.md) |
| Receipts | [templates/receipts.md](templates/receipts.md) |
| Long receipts | [templates/long-receipts.md](templates/long-receipts.md) |
| Checks | [templates/checks.md](templates/checks.md) |
| Credit cards | [templates/credit-cards.md](templates/credit-cards.md) |
| Business cards | [templates/business-cards.md](templates/business-cards.md) |
| Barcodes | [templates/barcodes.md](templates/barcodes.md) |
| OCR code strips | [templates/ocr-code-strips.md](templates/ocr-code-strips.md) |
| OCR code caps | [templates/ocr-code-caps.md](templates/ocr-code-caps.md) |
| W-2 | [templates/w2.md](templates/w2.md) |
| W-9 | [templates/w9.md](templates/w9.md) |
| Any-Documents | [templates/any-documents.md](templates/any-documents.md) |

## Product rules

**Headless Receipts and Headless Credit Cards are unsupported.** The pinned plugin does not link `VeryfiLensHeadless` and does not export `process`. Do not imitate Headless with `showCamera`.

**Lite / App Clip is unsupported.** No `VeryfiLensLite` reference.

**Remote Models is planned, not current.** No Gradle coordinate or SPM URL in this commit selects it. Do not add a Remote Models package. Do not set `retrieveCheckTiffIsOn` and promise a TIFF download. On the native SDKs, Remote Models is the size recommendation: a specific flavor embeds models, Remote Models keeps the binary smaller and downloads heavy resources after install for features the host turned on. Bank-check TIFF is one of those downloads and is not in the Checks-specific flavor yet because the TIFF model is large. Per-plugin Remote Models variants are planned. This Cordova plugin still links Full only.

**Size.** Do not quote the XCFramework or AAR file size as the size added to the installed app. Those artifacts are fat builds that contain every architecture and platform slice. Measure the final release product once with the Lens dependency linked and once without it. Tables and how published artifacts relate to the installed app: [SDK binary sizes](https://docs.veryfi.com/lens/mobile/settings/sdk_binary_sizes/).

**Any-Documents** is a broad product, not a KYC-only or medical-only product. Nutrition facts, US passport, driver license, and prescription labels are shortcut flavors of Any-Documents, not separate products. This plugin's Full binary support for a given `anyDocumentTemplate` is **unverified**. Contact support to confirm a template, including one not supported yet, before shipping it. See [templates/any-documents.md](templates/any-documents.md).

**Credit card data stays on the device.** The on-device engine is `"mobile"`. Card images are not a Cloud API payload. The Android Full artifact this plugin links does not allow `credit_card` or `code`; see the credit-card and OCR templates.

**Fraud detection and field detection are paid.** `fraudDetectionIsOn` does nothing without the validated account/backend entitlement. `documentFieldsToDetect` also needs that entitlement and a Field Detection, Remote Models, or Lite flavor. This plugin links none of those flavors, so a settings key cannot turn local field detection on.

**Backups.** `backupDocsToGallery` defaults true on the native SDKs and copies every scan into the user's Photos or gallery. `backupDocsToiCloud` copies every scan into iCloud (iOS). Set both false unless the host wants those copies. Keep `moreMenuIsOn` false so end users cannot turn the copies back on. `backupDocsToiCloud` is an iOS setting; Android has no iCloud backup switch.

**Info views.** `showInfoButton` and `cameraInfoView` are native UI objects (`VeryfiInfoView` on iOS, a `Fragment` on Android). A boolean or string in the settings object does not embed a Cordova page. They are hard to bridge. See [unbridged.md](unbridged.md).

**Native methods that are missing here could be ported** by adding a plugin method that calls the existing native API. They are unavailable in this commit. Do not invent the JavaScript call. See [parity.md](parity.md) and [unbridged.md](unbridged.md).

## Wire-up order

The source implements this order. `init` only stores values. `showCamera` builds `{ url, clientId, userName, apiKey }`, sends `[auth, settings]`, and on both platforms configures and then presents.

1. Build the settings object (base + one recipe).
2. `Lens.init(false, url, clientId, username, apiKey, settings)`.
3. `Lens.showCamera(onLens, onLaunchError)`.
4. `JSON.parse` every success payload. Switch on `event`.

Neither bridge waits for a successful configure before `showCamera`. iOS ignores the configure `BOOL`. Android calls `configure` without a completion lambda, then `showCamera()`. Presenting only after a host-visible success flag is **not available** on this plugin. See [platforms.md](platforms.md).

## Do not

- Edit the plugin, the iOS SDK, or the Android SDK from this skill
- Install `VeryfiLens-Receipts`, `VeryfiLens-Cheques`, `VeryfiLens-Lite`, `VeryfiLens-OCR`, a Headless pod, or a Remote Models artifact into the Cordova app. The plugin already links Full
- Invent `showGallery`, `showDocumentBrowser`, `closeCamera`, `uploadImages`, or `headlessUpload`
- Set `dataExtractionEngine` to `"custom"` (the plugin README mentions it; the iOS decoder accepts only `api`, `mobile`, `none`)
- Set `"mobile"` except for `credit_card`, `code`, or `barcode`
- Send credit card data to the backend
- Promise credit-card or OCR-code capture on the Android Full artifact
- Promise Lite, Headless, or current Remote Models
- Present an unverified Any-Documents template as included
- Set `showInfoButton` to embed a Cordova screen
- Leave `dictateIsOn` true (obsolete; not partner available)
- Leave `ignoreRemoteSettings` false unless the host wants dashboard `lens_settings` to override the recipe
- Leave `backupDocsToGallery` or `backupDocsToiCloud` true unless the host wants user libraries filled with document copies
- Leave `moreMenuIsOn` true unless end users should override capture, torch, backups, and close-camera-after-submit
- Add extra arguments to `retryPackage`. JavaScript sends only the package id
- Quote an XCFramework or AAR size as the installed app-size increase
- Treat `getFileBase64` as taking a raw path string. Pass the update object; native reads `data`

## Output

When generating host code, produce:

1. The install command and the usage strings the recipe actually needs
2. `init` + `showCamera` with `JSON.parse`
3. Base hardening plus one recipe, with a one-line comment per non-obvious key
4. Which platform limits still apply (Android type gate, retry callback steal, no configure success flag)
5. A short conflict note if any residual risk remains
