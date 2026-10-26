# Install

Pinned plugin: `@veryfi/cordova-plugin-veryfi-lens` `2.6.60`, id `cordova-plugin-veryfi-lens`. Commit in [sources.md](sources.md).

README command (private git, not a public npm install):

```sh
cordova plugin add ssh://bitbucket.org/veryfi/cordova-plugin-veryfi-lens.git#[VERSION] --save
```

`www/veryfi.js` is clobbered onto `cordova.plugins.Veryfi`. Call `cordova.plugins.Veryfi.Lens`.

## What the plugin links

| Platform | Artifact in this commit | Role |
|----------|-------------------------|------|
| iOS | SPM `https://repo.veryfi.com/shared/lens/veryfi-lens-spm.git` from `3.0.13` (`Package.swift`) | Full UI package. iOS 13+. |
| Android | `com.veryfi.lens:veryfi-lens-sdk:2.6.0.15` (`src/android/Veryfi.gradle`) | Full UI AAR. No flavor suffix. |

Do not add a second Lens pod, SPM repo, or Maven artifact. A receipts-only or checks-only binary is a native flavor. This plugin does not ship it.

`plugin.xml` sets `android-minSdkVersion` 23 and `android-targetSdkVersion` 35. The README's min SDK 21 disagrees. Follow `plugin.xml`.

## Android Maven

`src/android/Veryfi.gradle` reads:

- `MAVEN_VERYFI_URL`
- `MAVEN_VERYFI_USERNAME`
- `MAVEN_VERYFI_PASSWORD`

Veryfi provides those values. Keep them in the environment or CI secrets. Do not copy a password into the repo.

The Android manifest merge also requests `${applicationId}.permission.ANALYTICS_EVENT`. That permission is for the analytics broadcast, not for camera.

## iOS usage strings

`plugin.xml` **replaces** these Info.plist keys on install:

| Key | Plugin string | Needed when |
|-----|---------------|-------------|
| `NSCameraUsageDescription` | Scan documents | `showCamera` (always, for this plugin) |
| `NSPhotoLibraryUsageDescription` | Choose document images | `galleryIsOn` |
| `NSPhotoLibraryAddUsageDescription` | Back up document images | `backupDocsToGallery` true. Base recipe sets it false |
| `NSLocationWhenInUseUsageDescription` | Nearby vendors | `locationServicesIsOn` true. Base recipe sets it false |
| `NSContactsUsageDescription` | Contacts | Not used by these recipes. Legacy / Unconfirmed |
| `NSCalendarsUsageDescription` | Calendar | Not used by these recipes. Legacy / Unconfirmed |
| `NSSpeechRecognitionUsageDescription` | Dictation | `dictateIsOn` is obsolete. Leave it false |
| `NSMicrophoneUsageDescription` | Dictation | Same |

The plugin merges Contacts, Calendar, speech, and microphone strings even when the recipe leaves those features off. Do not turn the features on to match the strings. Camera is the key `showCamera` requires. Photo library is required when `galleryIsOn` is true. Photo library add is required only when gallery backup is on. Location only when location services are on.

`plugin.xml` also sets the iCloud Documents entitlement on Debug and Release. `backupDocsToiCloud` still stays false unless the host wants every scan copied into iCloud. The entitlement is not a reason to enable the copy.

## Credentials

`init` stores them. `showCamera` sends:

```javascript
{
  url: 'https://api.veryfi.com/',
  clientId: clientId,
  userName: username,
  apiKey: apiKey
}
```

The key is `userName`, matching iOS `Keys.userName` and Android `raw` username. Android rejects an empty `clientId` with the error callback string `Expected one non-empty string argument.` iOS does not check that string before `configure`. Empty credentials on iOS surface as a Lens error (`msg` `invalid_credentials`) when the SDK reports it, and this plugin still calls `showCamera` because it ignores the configure `BOOL`. See [platforms.md](platforms.md).

## After install

Continue with [syntax.md](syntax.md) and one template. Do not open the camera from `deviceready` until credentials and the settings object exist.
