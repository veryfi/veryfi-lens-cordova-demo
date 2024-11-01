import * as DocumentTypes from '@/constants/document-types';

const baseConfig = {
    allowSubmitUndetectedDocsIsOn: true,
    accentColor: "#00fa6c",
    accentDarkColor: "#00fa6c",
    afterScanCloseCameraIsOn: true,
    autoCaptureIsOn: false,
    autoCropBrowserIsOn: false,
    autoCropGalleryIsOn: false,
    autoDocDetectionAndCropIsOn: true,
    autoDeleteAfterProcessing: false,
    autoDeleteLocalResourcesAfterProcessing: true,
    autoLightDetectionIsOn: true,
    autoRotateIsOn: false,
    autoSkewCorrectionIsOn: false,
    autoSubmitDocumentOnCapture: false,
    autoTagSource: false,
    autoTagDeviceId: false,
    autoTagLensVersion: false,
    autoTagPlatform: false,
    barcodeExtractionIsOn: false,
    browseIsOn: true,
    blurDetectionIsOn: true,
    boostModeIsOn: false,
    boundingBoxesIsOn: false,
    backupDocsToGallery: true,
    cleanBordersIsOn: false,
    checksBacksIsOn: false,
    checksBackIsRequired: false,
    creditCardAutoCaptureMode: "Normal",
    creditCardMarginTop: 100,
    creditCardMarginBottom: 0,
    closeCameraOnSubmit: true,
    confidenceDetailsIsOn: false,
    dataExtractionEngine: "api",
    detectBlurResponseIsOn: false,
    dewarpingIsOn: false,
    dialogMessageColor: "#171c3a",
    dialogMessageColorDark: "#001111",
    dialogRightButtonTextColor: "#171c3a",
    dialogRightButtonTextColorDark: "#171c3a",
    dialogRightButtonBackgroundColor: "#00fa6c",
    dialogRightButtonBackgroundColorDark: "#00fa6c",
    dialogLeftButtonTextColor: "#171c3a",
    dialogLeftButtonTextColorDark: "#dddddd",
    dictateIsOn: true,
    docDetectFillUIColor: "#5200FA6C",
    docDetectStrokeUIColor: "#5200FA6C",
    documentTypes: [],
    emailCCIsOn: true,
    emailCCDomain: "veryfi.cc",
    externalId: "",
    manualCropIsOn: true,
    galleryIsOn: true,
    fraudDetectionIsOn: true,
    gpuIsOn: true,
    glareDetectionIsOn: true,
    anyDocumentType: "",
    isProduction: true,
    locationServicesIsOn: false,
    moreMenuIsOn: true,
    moreSettingsMenuIsOn: true,
    multipleDocumentsIsOn: true,
    multiplePagesCaptureIsOn: true,
    noCompressOnWifi: false,
    notificationChannelName: "notificationChannelName",
    originalImageMaxSizeInMB: 2.5,
    ocrRegex: '[A-Z0-9]{10}',
    ocrViewCornerRadius: 20,
    ocrViewWidth: 85,
    ocrViewHeight: 8,
    parseAddressIsOn: false,
    primaryColor: "#00fa6c",
    primaryDarkColor: "#00fa6c",
    rotateDocIsOn: true,
    returnStitchedPDF: false,
    saveLogsIsOn: true,
    secondaryColor: "#E9ECE4",
    secondaryDarkColor: "#171C3A",
    shareLogsIsOn: true,
    stitchIsOn: true,
    stitchCounter: false,
    showDocumentTypes: true,
    showNoDocumentDetectedWarning: true,
    softBinarizationIsOn: false,
    stitchedPDFPixelDensityMultiplier: 2,
    switchCamera: false,
    submitButtonBackgroundColor: "#00fa6c",
    submitButtonBorderColor: "#00fa6c",
    submitButtonCornerRadius: 5,
    submitButtonFontColor: "#171c3a",
    tags: [],
    toolbarIconsColor: "#171c3a",
    toolbarIconsDarkColor: "#dddddd",
    documentTypesTextColor: "#000000",
    webhookIsOn: false,
    zoomIsOn: true
};

export const defaultReceiptConfig = {...baseConfig};
defaultReceiptConfig.documentTypes = [DocumentTypes.RECEIPT];

export const defaultLongReceiptConfig = {...baseConfig};
defaultLongReceiptConfig.documentTypes = [DocumentTypes.LONG_RECEIPT];

export const defaultCheckConfig = {...baseConfig};
defaultCheckConfig.documentTypes = [DocumentTypes.CHECK];

export const defaultCreditCardConfig = {...baseConfig};
defaultCreditCardConfig.documentTypes = [DocumentTypes.CREDIT_CARD];

export const defaultBusinessCardConfig = {...baseConfig};
defaultBusinessCardConfig.documentTypes = [DocumentTypes.BUSINESS_CARD];

export const defaultCodeConfig = {...baseConfig};
defaultCodeConfig.documentTypes = [DocumentTypes.CODE];

export const defaultW2Config = {...baseConfig};
defaultW2Config.documentTypes = [DocumentTypes.W2];

export const defaultW9Config = {...baseConfig};
defaultW9Config.documentTypes = [DocumentTypes.W9];

export const defaultBankStatementsConfig = {...baseConfig};
defaultBankStatementsConfig.documentTypes = [DocumentTypes.BANK_STATEMENTS];

export const defaultBarcodesConfig = {...baseConfig};
defaultBarcodesConfig.documentTypes = [DocumentTypes.BARCODES];

export const defaultInsuranceCardConfig = {...baseConfig};
defaultInsuranceCardConfig.documentTypes = [DocumentTypes.INSURANCE_CARD];

export const defaultPassportConfig = {...baseConfig};
defaultPassportConfig.documentTypes = [DocumentTypes.PASSPORT];

export const defaultDriverLicenseConfig = {...baseConfig};
defaultDriverLicenseConfig.documentTypes = [DocumentTypes.DRIVER_LICENSE];

