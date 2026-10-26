# Receipts

Cloud extraction for `receipt`, `invoice`, and `other` on the Full binary this plugin already links. There is no Cordova receipts package. Native receipts-specific artifacts (`VeryfiLens-Receipts`, `veryfi-lens-spm-receipts`, `veryfi-lens-receipts-sdk`) are not what `Package.swift` and `Veryfi.gradle` depend on. Do not add them.

Android Full allows these three types. They are the iOS Full set that is not marked Unconfirmed.

Long receipts are a different document type. Use [long-receipts.md](long-receipts.md) only after the iOS model question in that file is settled. Do not add `long_receipt` here.

## Settings

Merge [recipes.md](../recipes.md) base with the receipts object. `showBrowserButton` replaces More-menu Browse.

```javascript
var settings = {
  ignoreRemoteSettings: true,
  backupDocsToGallery: false,
  backupDocsToiCloud: false,
  moreSettingsMenuIsOn: false,
  moreMenuIsOn: false,
  autoCaptureOtherIsOn: false,
  showNoDocumentDetectedWarning: false,
  dictateIsOn: false,
  locationServicesIsOn: false,
  glareDetectionIsOn: false,
  enableScreenshots: true,

  dataExtractionEngine: 'api',
  documentTypes: ['receipt', 'invoice', 'other'],
  showDocumentTypes: true,
  defaultSelectedDocumentType: 'receipt',
  autoSubmitDocumentOnCapture: false,
  imagePreviewIsOn: true,
  galleryIsOn: true,
  browseIsOn: false,
  showBrowserButton: true,
  autoCaptureIsOn: false,
  autoDocDetectionAndCropIsOn: true,
  autoRotateIsOn: true,
  autoSkewCorrectionIsOn: true,
  cleanBorderIsOn: true,
  stitchIsOn: true,
  multiplePagesCaptureIsOn: true,
  multipleDocumentsIsOn: true,
  returnStitchedPDF: true,
  packageMaxScans: 10,
  closeCameraOnSubmit: true
};
```

Review-then-submit is the default. Auto-submit is `autoSubmitDocumentOnCapture: true` and `batchUploadOnCamera` left false. Batch-until-max is the opposite pair plus `packageMaxScans`. Do not set both auto-submit and batch.

## Wire-up

Same `init` and `showCamera` as [full.md](full.md). Success for cloud extract uses `status` `"done"` and `msg` `"results"`. Image paths arrive on `veryfi_lens_update` (`img_original_path`, `img_thumbnail_path`, `img_stitched_pdf_path`). Pass that object to `getFileBase64`.

Photo library usage is required because `galleryIsOn` is true. Gallery backup stays false, so photo-library-add is only the string `plugin.xml` already merged, not a feature to enable.

## iOS and Android

| | iOS | Android |
|--|-----|---------|
| Binary | Full SPM from `3.0.13` | `veryfi-lens-sdk:2.6.0.15` |
| These types | Accepted as the Full UI receipt set | Allowed on Full |
| Failure status | `fail` | `failed` |
| Configure | Bool ignored; camera still requested | No completion lambda; `showCamera()` follows immediately |

Stitch and PDF return are appropriate for multi-page receipts. `stitchOtherIsOn` stays off unless `other` should stitch differently from receipts. The base recipe already stops `other` from auto-capturing.

## Do not

- Set `"mobile"` for receipts
- Set `backupDocsToGallery` true
- Promise Headless receipt processing. Unsupported
