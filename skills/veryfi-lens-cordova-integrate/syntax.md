# Call syntax

Settings values live in [recipes.md](recipes.md). This file is the call shape in `www/veryfi.js` and the native handlers behind it.

`init` does not open the camera and does not call native `configure`. It stores `isDebug`, URL, client id, username, API key, and the settings object.

`showCamera` builds the auth object and `exec`s `Veryfi.showCamera` with `[auth, settings]`. Both native sides configure, set a delegate, and present the Lens camera. Events return as **JSON strings** on that success callback. Parse, then switch on `event`.

```javascript
var settings = { /* base from recipes.md, then one recipe */ };

cordova.plugins.Veryfi.Lens.init(
  false,
  'https://api.veryfi.com/',
  clientId,
  username,
  apiKey,
  settings
);

cordova.plugins.Veryfi.Lens.showCamera(onLens, onLaunchError);

function onLens(response) {
  var json = JSON.parse(response);
  switch (json.event) {
    case 'veryfi_lens_close':
      break;
    case 'veryfi_lens_update':
      if (json.msg === 'img_original_path' ||
          json.msg === 'img_thumbnail_path' ||
          json.msg === 'img_stitched_pdf_path') {
        cordova.plugins.Veryfi.Lens.getFileBase64(json, function (b64) {}, function () {});
      }
      break;
    case 'veryfi_lens_success':
      break;
    case 'veryfi_lens_error':
      break;
  }
}

function onLaunchError(error) {}
```

Pass `false` as the first `init` argument in production. `true` logs the auth object, including the API key, through `console.log`.

## Events

The native delegate dictionary is forwarded. Both bridges add `event`:

| Native delegate | `event` string |
|-----------------|----------------|
| `veryfiLensClose` | `veryfi_lens_close` |
| `veryfiLensUpdate` | `veryfi_lens_update` |
| `veryfiLensSuccess` | `veryfi_lens_success` |
| `veryfiLensError` | `veryfi_lens_error` |

iOS keeps one callback id from `showCamera` (`launchCallbackID`) and sends every later camera event there with `keepCallback`. Android sends on the `showCamera` `CallbackContext`, also with `keepCallback`.

There is no second listener API. Registering another `showCamera` replaces the session.

Payload fields the bridge does not rename are in [implementation.md](implementation.md). Cordova delivers a string. `JSON.parse` before reading `event`.

## Files

`getFileBase64` passes the object through. Native reads `data` as the path. Pass the update object, not a raw string.

```javascript
cordova.plugins.Veryfi.Lens.getFileBase64(json, function (b64) {}, function (error) {});
```

iOS uses `VeryfiLens.utils.base64For` on the file bytes. Android reads the file and Base64-encodes it, and also reads `msg` for a timing log. A missing `msg` is caught; the base64 string is still returned when `data` was read first.

## Other calls

```javascript
cordova.plugins.Veryfi.Lens.retryPackage(packageId, function () {}, function () {});
cordova.plugins.Veryfi.Lens.retryAllPackages(function () {}, function () {});
cordova.plugins.Veryfi.Lens.discardPackage(packageId, function () {}, function () {});
cordova.plugins.Veryfi.Lens.discardAllPackages(function () {}, function () {});
cordova.plugins.Veryfi.Lens.shareOCRFeedback(function () {}, function () {});
cordova.plugins.Veryfi.Lens.observeAnalyticsEvents(function (payload) {}, function () {});
```

`retryPackage` in JavaScript takes only the id. The `exec` argument is that string, not an array of id, metadata, and tag. iOS `Veryfi.m` reads `arguments` indexes 0, 1, and 2 (package id, metadata, image source tag) and also stores `command.callbackId` into `launchCallbackID`, which is the camera event callback. A retry can steal later camera events. Android `retryUpload` uses the id string only. Do not add extra JavaScript arguments. The public function does not declare them. Details: [platforms.md](platforms.md).

`getAuth()` and `getSettings()` return the stored objects. `getAuth()` returns null when `clientId` is empty. They do not talk to native code.

## Analytics

Analytics is a **second** success callback, not the camera callback.

```javascript
cordova.plugins.Veryfi.Lens.observeAnalyticsEvents(function (payload) {
  var json = JSON.parse(payload);
}, function () {});
```

iOS observes `VeryfiLensAnalyticsEvent` and forwards the notification JSON string. It does not add the camera `event` wrapper. Android listens for `com.veryfi.lens.VeryfiLensSecureAnalyticsEvent` (permission `${applicationId}.permission.ANALYTICS_EVENT`) and returns `{ "event": "...", "params": { "<params extra>": "<value extra>" } }` when those intent extras exist.

Calling `observeAnalyticsEvents` again replaces the observer.

## Not on this plugin

`showGallery`, `showDocumentBrowser`, `closeCamera`, `uploadImages`, `headlessUpload`, Headless `process`, Lite, `onHelpButtonClicked`, `VeryfiInfoView`. In-camera gallery still depends on `galleryIsOn` inside the camera `showCamera` opens. A dedicated Files button is `showBrowserButton`. `browseIsOn` only adds Browse inside the More menu, which stays off in the base recipe. See [implementation.md](implementation.md) and [unbridged.md](unbridged.md).
