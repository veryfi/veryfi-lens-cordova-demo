# Callbacks, files, and entry points

Events are JSON strings on the `showCamera` success callback. Parse first. Keys stay the native snake_case names. The bridge adds `event` and does not filter the rest. Do not invent keys. Extra native keys can appear.

## Entry points

| Need | On this plugin |
|------|----------------|
| Lens camera | `Lens.showCamera` after `Lens.init` |
| In-camera gallery | `galleryIsOn: true` inside that camera. There is no `showGallery` |
| Files from the camera | `showBrowserButton: true` (top-right button) or `galleryIsOn` + `galleryButtonWithFilesIsOn: true`. `browseIsOn` only fills the More menu, and the base recipe turns that menu off |
| Standalone gallery or document browser | **Unavailable.** Native `showGallery` / `showDocumentBrowser` could be ported. They are not in `veryfi.js` |
| Close the camera from JS | **Unavailable.** Native `closeCamera` could be ported |
| Upload files the host already has | **Unavailable.** Native UI-SDK `uploadImages` could be ported. That method is still the UI SDK, not Headless. Headless is a different binary and is unsupported |
| In-memory iOS `headlessUpload` | **Unavailable.** Not a Headless product either |

Do not open two Lens cameras. A second `showCamera` starts another configure-and-present on both platforms.

## Callback moments

| `event` | When | What to do |
|---------|------|------------|
| `veryfi_lens_update` | Often. Thumbnail path, original path, stitched PDF, upload progress | Not finished extraction. Copy files here if you need them |
| `veryfi_lens_success` | Processing finished for a package | Read the body. For cloud extract, README shape is `status` `"done"`, `msg` `"results"`, body in `data` |
| `veryfi_lens_error` | Upload, process, config, or exception | Read `status`, `error` or `exception`, `msg` |
| `veryfi_lens_close` | The Lens UI session ended (submit or cancel) | Not a substitute for success. README fields: `session_scan_count`, `queue_count`, `framework-version`, `framework-build` |

Update image fields the README names: `msg` of `img_thumbnail_path`, `img_original_path`, or `img_stitched_pdf_path`; `data` is the path; `package_id` may be present.

Update progress in the Cordova README: `status` `progress`, `msg` `clear-offline-cache` / `uploading` / `extracting`, optional `data` percent. React and Flutter READMEs describe progress differently (`msg` `progress`). Trust the Cordova README for this plugin, and still tolerate extra native keys.

Success envelope for a cloud package: `msg` `results`, `data`, `package_id`, `status` `done`.

Error: `status` `error` plus `error`, or `status` `exception` plus `exception`, plus `package_id`. iOS also uses `status` `"fail"`. Android uses `"failed"`. Handle both.

Barcode and OCR successes on iOS pass `BarcodeResult` / `OCRResult` JSON directly, without the package `status` / `msg` / `data` envelope. This plugin forwards that JSON and adds `event`. Do not require `status === "done"` for those types. Android's barcode and OCR field list on this older Full AAR is **Unconfirmed**, and Android Full rejects `code` (and the flavor gate rejects `credit_card`). `barcode` is allowed on Android Full.

### Engine and the success body

| `dataExtractionEngine` | Result |
|------------------------|--------|
| `"api"` | Veryfi Cloud processes the package. Extraction is in `data` when `status` is `done` |
| `"mobile"` | On-device extract for `credit_card`, `code`, or `barcode` only. Credit card data never leaves the device |
| `"none"` | Lens does not call Process a Document. `uploadWithoutProcessingIsOn: false` keeps a local package; with auto-delete off, success `data` can include `local_package_path`. `uploadWithoutProcessingIsOn: true` uploads and returns remote `bucket` and `package_path` for the customer to process later |

`"custom"` is in the plugin README and is not an iOS decoder value. Do not emit it.

`webhookIsOn: true` means the host can miss an immediate success. Leave it false unless the host handles the webhook.

## Local files and who deletes them

Paths in `update` point at app storage (not the user's Photos library, unless gallery backup is on).

| Kind | Typical `msg` / key | Role |
|------|---------------------|------|
| Original image | `img_original_path` | Package image |
| Thumbnail | `img_thumbnail_path` | Preview |
| Stitched or imported PDF | `img_stitched_pdf_path` | Multi-page or PDF import |
| Retained zip | `data.local_package_path` | Only meaningful when auto-delete is off and the engine is `"none"` with local decoupling |

Native default `autoDeleteLocalResourcesAfterProcessing` is true: Lens deletes that package's files after processing. A host that shows one document at a time can copy during `update` (or `getFileBase64`) immediately.

Set `autoDeleteLocalResourcesAfterProcessing: false` when the host reads paths later, or when several packages are in flight. Shared copies get overwritten while package folders disappear. When the flag is false, **the host owns deletion**.

Native `clearLensStorage()` wipes Lens local files and the upload queue. It is **not bridged**. `discardPackage` / `discardAllPackages` clear the **upload queue**, not retained images, PDFs, or zips after a successful process. There is no JavaScript delete-path method. If the host must free disk, say so and stop. A plugin port could call `clearLensStorage`. Do not invent `Lens.clearStorage()`.

`getFileBase64` reads whatever is still at `data`. Call it in the update handler before the next capture when auto-delete is true.

Gallery backup (`backupDocsToGallery`) is a **second copy** in Photos. It is not the package path. Leave it false.

## Queue helpers

| Call | Native effect | Bridge caveat |
|------|---------------|---------------|
| `retryPackage(id)` | Ask Lens to retry that upload | iOS expects metadata and `imageSourceTag` and does not receive them. iOS replaces the camera callback id. Android retries by id only |
| `retryAllPackages()` | Retry the queue | iOS does not replace `launchCallbackID` in this method |
| `discardPackage(id)` | Drop one queued upload | iOS replaces `launchCallbackID` |
| `discardAllPackages()` | Drop the queue | Does not delete retained files |
| `shareOCRFeedback()` | Send the last OCR scan as failing feedback | No arguments |

## Decoupled capture

When the customer owns Process a Document:

```javascript
settings.dataExtractionEngine = 'none';
settings.uploadWithoutProcessingIsOn = false; // local zip
settings.autoDeleteLocalResourcesAfterProcessing = false;
```

Remote package instead of a local zip:

```javascript
settings.dataExtractionEngine = 'none';
settings.uploadWithoutProcessingIsOn = true;
```

Cloud-only response flags do not shape the customer's later Process a Document request. Set those on the customer's backend call.

## Analytics

Separate from the camera callback. See [syntax.md](syntax.md). Do not look for `veryfi_lens_success` on the analytics payload.
