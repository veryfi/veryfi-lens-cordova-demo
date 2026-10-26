# Native APIs this plugin does not bridge

The plugin wraps a subset of the Full UI SDK. A missing wrapper is a plugin gap. The native method still exists on iOS or Android and **could be ported** by changing the plugin: accept the argument in `veryfi.js`, call the native method, and return the delegate payload the SDK already produces. Do not invent the JavaScript call, and do not tell the host to reach into the native SDK from a WebView unless they already maintain a custom bridge. This skill does not make that port.

## Hard to bridge: info views

`showInfoButton` and `cameraInfoView` are native UI objects, not colors or booleans.

| Platform | Type | What a JSON bool does |
|----------|------|------------------------|
| iOS | `VeryfiInfoView` | The settings initializer keeps `showInfoButton` only when the value is already a `VeryfiInfoView`. A bool or string does not become a screen. The view is pinned over the camera. The subclass calls inherited `close()` to dismiss |
| Android | `Fragment` (`showInfoButton`, `cameraInfoView`) | A JSON bool does not install a host fragment. Lens does not embed a Cordova layout |

`cameraInfoView` and `VeryfiLens.utils.updateCameraInfoView` are not bridged.

`showHelpButton` and `showInfoButton` share one camera control on iOS. Help wins. This plugin does not export `onHelpButtonClicked`, so the host cannot present its own HTML from that tap. Setting `showHelpButton: true` may show the native glyph only.

## UI SDK methods not exported

| Native UI SDK | Bridged | Notes |
|---------------|---------|--------|
| `showCamera` | Yes | The only presentation call |
| `showGallery` | No | Use `galleryIsOn` inside the camera, or port `showGallery` |
| `showDocumentBrowser` | No | Use `showBrowserButton`, or port the native method |
| `closeCamera` | No | Could be ported |
| `uploadImages` | No | UI SDK no-UI upload of files the host already has. Not Headless. Could be ported |
| `headlessUpload` (iOS, in memory) | No | Not a Headless product. Unsupported |
| `shareOCRFeedback` | Yes | |
| `retryPackage` / retry all | Yes, with the mismatch in [parity.md](parity.md) | A correct port would pass metadata and the image-source tag on iOS without replacing the camera callback id |
| `discardPackage` / discard all | Yes | iOS discard-one replaces the camera callback id |
| Base64 of a local file | Yes | `getFileBase64` |
| Analytics observe | Yes | Shapes differ by platform |
| Help click + host help screen | No | Could be ported. It is not a `VeryfiInfoView` |
| `clearLensStorage` / zip path lookup | No | Host cannot free Lens files through JS |
| SwiftUI presentation | No | iOS only, and not wrapped |
| Share Extension `shareExtensionModeIsOn` | No | iOS only |

## Headless products

Headless Receipts and Headless Credit Cards are different binaries and types (`VeryfiLensHeadless`, headless settings, `process` on frames the host camera captured). This plugin does not link those artifacts or export `process`.

Mark both **unsupported**. Do not approximate them with `showCamera`.

## Lite and Remote Models

Lite / App Clip (`VeryfiLensLite`) does not appear in this plugin. **Unsupported.**

Remote Models is not selected by the Gradle coordinate or the SPM URL. **Planned, not current.** Check TIFF (`retrieveCheckTiffIsOn`) belongs to that future binary. Do not add it to the checks recipe.

On the native SDKs, Remote Models is what to recommend when install size matters: heavy model resources download after install for the features the host enabled, and bank-check TIFF is one of those resources. Compare the final build with the SDK linked and with it removed. [SDK binary sizes](https://docs.veryfi.com/lens/mobile/settings/sdk_binary_sizes/). This Cordova package cannot select that flavor today.

## What to tell the host

If they need gallery-as-a-screen, a document browser, upload of existing files, a custom info view, or storage cleanup, say the method is unbridged and can be ported, then stop. Do not edit the plugin repo from this skill.
