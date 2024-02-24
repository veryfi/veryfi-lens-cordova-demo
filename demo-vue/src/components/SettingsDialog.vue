<template>
    <v-card class="rounded-0">
        <v-container fluid>

            <v-row class="align-center">
                <v-col cols="4" offset="4" class="text-center">
                    <div class="font-weight-bold text-h5">Settings</div>
                </v-col>
                <v-col cols="4" class="text-right">
                    <v-btn size="large" class="reset-button font-weight-bold" variant="flat" @click="resetSetting()">RESET</v-btn>
                </v-col>
            </v-row>

            <!-- General Settings -->
            <v-card class="rounded-lg mx-1 mt-2 settings-container text-body-2">
                <v-container fluid class="d-flex flex-flow px-3 py-5">
                    <img src="../assets/ic_vector_settings.svg" width="24" height="24" />
                    <div class="font-weight-bold text-body-1 mx-2">Settings general</div>
                </v-container>

                <v-list>
                    <v-list-item v-for="option in filteredGeneralSettings" :key="option.setting">
                        <v-list-item-title>{{ option.text }}</v-list-item-title>
                        <template v-slot:append>
                            <span v-if="option.type == 'text'" @click="openTextDialog(option)">{{
                                this.$store.state[this.documentType][option.setting] == null ||
                                this.$store.state[this.documentType][option.setting] == "" ? "N/A" :
                                this.$store.state[this.documentType][option.setting]
                            }}</span>
                            <v-switch v-else-if="option.type == 'switch'"
                                v-model="this.$store.state[this.documentType][option.setting]" class="switch"
                                color="success" />
                            <span v-else-if="option.type == 'slider'" @click="openSliderDialog(option)">{{
                                this.$store.state[this.documentType][option.setting] }}</span>
                        </template>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- Image processing Settings -->
            <v-card class="rounded-lg mx-1 mt-2 settings-container text-body-2">
                <v-container fluid class="d-flex flex-flow px-3 py-5">
                    <img src="../assets/ic_vector_settings.svg" width="24" height="24" />
                    <div class="font-weight-bold text-body-1 mx-2">Settings image processing</div>
                </v-container>

                <v-list>
                    <v-list-item v-for="option in filteredImageProcessingSettings" :key="option.setting">

                        <v-list-item-title>{{ option.text }}</v-list-item-title>
                        <template v-slot:append>
                            <span v-if="option.type == 'text'" @click="openTextDialog(option)">{{
                                this.$store.state[this.documentType][option.setting] == null ||
                                this.$store.state[this.documentType][option.setting] == "" ? "N/A" :
                                this.$store.state[this.documentType][option.setting]
                            }}</span>
                            <v-switch v-else-if="option.type == 'switch'"
                                v-model="this.$store.state[this.documentType][option.setting]" class="switch"
                                color="success" />
                        </template>

                    </v-list-item>
                </v-list>
            </v-card>

            <!-- UI Settings -->
            <v-card class="rounded-lg mx-1 mt-2 settings-container text-body-2">
                <v-container fluid class="d-flex flex-flow px-3 py-5">
                    <img src="../assets/ic_vector_settings.svg" width="24" height="24" />
                    <div class="font-weight-bold text-body-1 mx-2">Settings UI</div>
                </v-container>

                <v-list>
                    <v-list-item v-for="option in filteredUiSettings" :key="option.setting">

                        <v-list-item-title>{{ option.text }}</v-list-item-title>
                        <template v-slot:append>
                            <span v-if="option.type == 'text'" @click="openTextDialog(option)">{{
                                this.$store.state[this.documentType][option.setting] == null ||
                                this.$store.state[this.documentType][option.setting] == "" ? "N/A" :
                                this.$store.state[this.documentType][option.setting]
                            }}</span>
                            <v-switch v-else-if="option.type == 'switch'"
                                v-model="this.$store.state[this.documentType][option.setting]" class="switch"
                                color="success" />
                            <span v-else-if="option.type == 'slider'" @click="openSliderDialog(option)">{{
                                this.$store.state[this.documentType][option.setting] }}</span>
                            <div v-else class="colorPicker" @click="openColorDialog(option)"
                                :style="{ backgroundColor: this.$store.state[this.documentType][option.setting] }"></div>
                        </template>

                    </v-list-item>
                </v-list>
            </v-card>

            <!-- Api Settings -->
            <v-card class="rounded-lg mx-1 mt-2 settings-container text-body-2">
                <v-container fluid class="d-flex flex-flow px-3 py-5">
                    <img src="../assets/ic_vector_settings.svg" width="24" height="24" />
                    <div class="font-weight-bold text-body-1 mx-2">Settings API</div>
                </v-container>

                <v-list>
                    <v-list-item v-for="option in filteredApiSettings" :key="option.setting">

                        <v-list-item-title>{{ option.text }}</v-list-item-title>
                        <template v-slot:append>
                            <span v-if="option.type == 'text'" @click="openTextDialog(option)">{{
                                this.$store.state[this.documentType][option.setting] == null ||
                                this.$store.state[this.documentType][option.setting] == "" ? "N/A" :
                                this.$store.state[this.documentType][option.setting]
                            }}</span>
                            <v-switch v-else-if="option.type == 'switch'"
                                v-model="this.$store.state[this.documentType][option.setting]" class="switch"
                                color="success" />
                        </template>

                    </v-list-item>
                </v-list>
            </v-card>

        </v-container>

        <v-dialog width="500" v-model="showTextDialog">
            <v-card :title="dialogInfo.title" class="font-weight-bold">
                <v-card-text>
                    <v-text-field v-model="dialogInfo.value" hide-details />
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="CANCEL" class="font-weight-bold" @click="onCancleDialogClicked()"></v-btn>
                    <v-btn text="OK" class="font-weight-bold" @click="onOkTextDialogClicked()"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog width="400" v-model="showColorDialog">
            <v-card :title="dialogInfo.title" class="font-weight-bold">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col></v-col>
                            <v-col><v-color-picker v-model="dialogInfo.value" elevation="1" /></v-col>
                            <v-col></v-col>
                        </v-row>
                        <v-row>
                            <v-col></v-col>
                            <v-col>
                                <span>{{ dialogInfo.value }}</span>
                            </v-col>
                            <v-col></v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="CANCEL" class="font-weight-bold" @click="onCancleDialogClicked()"></v-btn>
                    <v-btn text="OK" class="font-weight-bold" @click="onOkColorDialogClicked()"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog width="500" v-model="showSliderDialog">
            <v-card :title="dialogInfo.title" class="font-weight-bold">
                <v-card-text>
                    <v-slider :ticks="tickLabels" step="1" show-ticks="always" v-model="dialogInfo.value" thumb-label tick-size="1" />
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="CANCEL" class="font-weight-bold" @click="onCancleDialogClicked()"></v-btn>
                    <v-btn text="OK" class="font-weight-bold" @click="onOkSliderDialogClicked()"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-card>
</template>
<style scoped>
.reset-button {
    border-radius: 5px;
    font-size: medium;
    background-image: linear-gradient(to right,
            #00FA6C,
            #2DB5D2);
}

.settings-container {
    background-color: #E9ECE4;
}

.switch {
    height: 55px;
    padding: 0px;
    margin: 0px;
}

.colorPicker {
    width: 25px;
    height: 25px;
    border-radius: 50%;
}
</style>
<script>
import * as DocumentTypes from '@/constants/document-types';

export default {
    name: 'SettingsDialog',
    props: {
        documentType: String,
    },
    created() {
        this.settings = this.$store.state[this.documentType];
        this.generalSettings = [
            {
                setting: "autoLightDetectionIsOn",
                type: "switch",
                text: "Auto light detection",
            },
            {
                setting: "stitchIsOn",
                type: "switch",
                text: "Stitch",
                isVisible: () => {
                    const hideFor = [DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: "switchCameraIsOn",
                type: "switch",
                text: "Switch camera",
            },
            {
                setting: "showStitchCounterNumber",
                type: "switch",
                text: "Stitch Counter",
            },
            {
                setting: "multipleDocumentsIsOn",
                type: "switch",
                text: "Multiple documents",
                isVisible: () => {
                    const hideFor = [DocumentTypes.LONG_RECEIPT, DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: "multiplePagesCaptureIsOn",
                type: "switch",
                text: "Multiple pages",
                isVisible: () => {
                    const hideFor = [DocumentTypes.LONG_RECEIPT, DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: "backupDocsToGallery",
                type: "switch",
                text: "Backup docs to gallery",
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: "returnStitchedPDF",
                type: "switch",
                text: "Return stitched PDF",
                isVisible: () => {
                    const hideFor = [DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: "checksBackIsOn",
                type: "switch",
                text: "Checks back",
                isVisible: () => {
                    const visibleFor = [DocumentTypes.CHECK];
                    return visibleFor.includes(this.documentType);
                }
            },
            {
                setting: "checksBackIsRequired",
                type: "switch",
                text: "Checks back is required",
                isVisible: () => {
                    const visibleFor = [DocumentTypes.CHECK];
                    return visibleFor.includes(this.documentType);
                }
            },
            {
                setting: "anyDocumentType",
                type: "text",
                text: "Any document type",
                isVisible: () => {
                    return this.documentType == DocumentTypes.BUSINESS_CARD;
                }
            },
            {
                setting: "closeCameraOnSubmit",
                type: "switch",
                text: "Close camera on submit",
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: "locationServicesIsOn",
                type: "switch",
                text: "Location services",
                isVisible: () => {
                    const hideFor = [DocumentTypes.LONG_RECEIPT, DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: "autoTagSource",
                type: "switch",
                text: "Auto tag source",
                isVisible: () => {
                    const hideFor = [DocumentTypes.LONG_RECEIPT, DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: "browseIsOn",
                type: "switch",
                text: "Browse",
                isVisible: () => {
                    const hideFor = [DocumentTypes.LONG_RECEIPT, DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: "zoomIsOn",
                type: "switch",
                text: "Zoom",
            },
            {
                setting: "barcodeExtractionIsOn",
                type: "switch",
                text: "Barcode extraction",
                isVisible: () => {
                    return this.documentType == DocumentTypes.RECEIPT;
                }
            },
            {
                setting: "autoTagDeviceId",
                type: "switch",
                text: "Auto tag device",
            },
            {
                setting: "autoTagLensVersion",
                type: "switch",
                text: "Auto tag Lens version",
            },
            {
                setting: "autoTagPlatform",
                type: "switch",
                text: "Auto tag platform",
            },
            {
                setting: "allowSubmitUndetectedDocsIsOn",
                type: "switch",
                text: "Allow submit undetected docs",
                isVisible: () => {
                    const hideFor = [DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE]
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: "autoSubmitDocumentOnCapture",
                type: "switch",
                text: "Auto submit document on capture",
            },
            {
                setting: "originalImageMaxSizeInMB",
                type: "text",
                text: "Original image max size in MB",
                isVisible: () => {
                    const hideFor = [DocumentTypes.LONG_RECEIPT, DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: "ocrRegex",
                type: "text",
                text: "OCR Regex",
                isVisible: () => {
                    const visibleFor = [DocumentTypes.CODE];
                    return visibleFor.includes(this.documentType);
                }
            },
            {
                setting: "ocrViewCornerRadius",
                type: "slider",
                text: "OCR view corner radius",
                value: 20,
                isVisible: () => {
                    const visibleFor = [DocumentTypes.CODE];
                    return visibleFor.includes(this.documentType);
                }
            },
            {
                setting: "ocrViewWidth",
                type: "slider",
                text: "OCR view width",
                value: 85,
                isVisible: () => {
                    const visibleFor = [DocumentTypes.CODE];
                    return visibleFor.includes(this.documentType);
                }
            },
            {
                setting: "ocrViewHeight",
                type: "slider",
                text: "OCR view height",
                value: 8,
                isVisible: () => {
                    const visibleFor = [DocumentTypes.CODE];
                    return visibleFor.includes(this.documentType);
                }
            },
            {
                setting: "tags",
                type: "text",
                text: "Tags",
                isVisible: () => {
                    const hideFor = [DocumentTypes.LONG_RECEIPT, DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            }
        ];
        this.imageProcessingSettings = [
            {
                setting: 'autoRotateIsOn',
                type: "switch",
                text: "Auto rotate",
            },
            {
                setting: 'autoDocDetectionAndCropIsOn',
                type: "switch",
                text: "Auto doc detecttion and crop",
                isVisible: () => {
                    const hideFor = [DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'blurDetectionIsOn',
                type: "switch",
                text: "Blur detection",
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'autoSkewCorrectionIsOn',
                type: "switch",
                text: "Auto skew correction",
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'softBinarizationIsOn',
                type: "switch",
                text: "Soft binarization",
                isVisible: () => {
                    const hideFor = [DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'dewarpingIsOn',
                type: "switch",
                text: "Dewarping",
                isVisible: () => {
                    const hideFor = [DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'autoCropGalleryIsOn',
                type: "switch",
                text: "Auto crop gallery",
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'gpuIsOn',
                type: "switch",
                text: "GPU",
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'glareDetectionIsOn',
                type: "switch",
                text: "Glare detection",
            },
        ];
        this.uiSettings = [
            {
                setting: 'primaryColor',
                type: 'picker',
                text: 'Primary color',
                value: '#455678'
            },
            {
                setting: 'primaryDarkColor',
                type: 'picker',
                text: 'Primary dark color',
                value: '#455678'
            },
            {
                setting: 'secondaryColor',
                type: 'picker',
                text: 'Secondary color',
                value: '#455678'
            },
            {
                setting: 'secondaryDarkColor',
                type: 'picker',
                text: 'Secondary dark color',
                value: '#455678'
            },
            {
                setting: 'accentColor',
                type: 'picker',
                text: 'Accent color',
                value: '#455678'
            },
            {
                setting: 'accentDarkColor',
                type: 'picker',
                text: 'AccentDark color',
                value: '#455678'
            },
            {
                setting: 'docDetectFillUIColor',
                type: 'picker',
                text: 'Doc detect fill Color',
                value: '#455678',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'submitButtonBackgroundColor',
                type: 'picker',
                text: 'Submit button backgroung color',
                value: '#455678'
            },
            {
                setting: 'submitButtonBorderColor',
                type: 'picker',
                text: 'Submit button border color',
                value: '#455678'
            },
            {
                setting: 'submitButtonFontColor',
                type: 'picker',
                text: 'Submit button font color',
                value: '#455678'
            },
            {
                setting: 'docDetectStrokeUIColor',
                type: 'picker',
                text: 'Doc detect stroke UI color',
                value: '#455678'
            },
            {
                setting: 'dialogMessageColor',
                type: 'picker',
                text: 'Dialog message color',
                value: '#455678'
            },
            {
                setting: 'dialogMessageColorDark',
                type: 'picker',
                text: 'Dialog message color dark',
                value: '#455678'
            },
            {
                setting: 'dialogRightButtonTextColor',
                type: 'picker',
                text: 'Dialog right button text color',
                value: '#455678'
            },
            {
                setting: 'dialogRightButtonTextColorDark',
                type: 'picker',
                text: 'Dialog right button text color dark',
                value: '#455678'
            },
            {
                setting: 'dialogRightButtonBackgroundColor',
                type: 'picker',
                text: 'Dialog right button background color',
                value: '#455678'
            },
            {
                setting: 'dialogRightButtonBackgroundColorDark',
                type: 'picker',
                text: 'Dialog right button background color dark',
                value: '#455678'
            },
            {
                setting: 'dialogLeftButtonTextColor',
                type: 'picker',
                text: 'Dialog left button text color',
                value: '#455678'
            },
            {
                setting: 'dialogLeftButtonTextColorDark',
                type: 'picker',
                text: 'Dialog left button text color dark',
                value: '#455678'
            },
            {
                setting: 'toolbarIconsColor',
                type: 'picker',
                text: 'Toolbar icons color',
                value: '#455678'
            },
            {
                setting: 'toolbarIconsDarkColor',
                type: 'picker',
                text: 'Toolbar icons dark color',
                value: '#455678'
            },
            {
                setting: 'documentTypesTextColor',
                type: 'picker',
                text: 'Document types text color',
                value: '#455678'
            },
            {
                setting: 'submitButtonCornerRadius',
                type: 'slider',
                text: 'Submit button corner radius',
                value: 5
            },
            {
                setting: 'manualCropIsOn',
                type: 'switch',
                text: 'Manual crop',
                value: '#455678',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'moreMenuIsOn',
                type: 'switch',
                text: 'More menu',
                value: '#455678',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'moreSettingsMenuIsOn',
                type: 'switch',
                text: 'More settings menu',
                value: '#455678',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'galleryIsOn',
                type: 'switch',
                text: 'Gallery',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'dictateIsOn',
                type: 'switch',
                text: 'Dictate',
                value: '#455678',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'emailCCIsOn',
                type: 'switch',
                text: 'Email CC',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'emailCCDomain',
                type: 'text',
                text: 'Email CC domain',
                value: 'veryfi.cc',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CHECK, DocumentTypes.CREDIT_CARD, DocumentTypes.BUSINESS_CARD, DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'rotateDocIsOn',
                type: 'switch',
                text: 'Rotate doc',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'showNoDocumentDetectedWarning',
                type: 'switch',
                text: 'Show no document detected warning',
            },
        ];
        this.apiSettings = [
            {
                setting: 'autoDeleteAfterProcessing',
                type: 'switch',
                text: 'Auto delete after processing',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'boostModeIsOn',
                type: 'switch',
                text: 'Boost mode',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'boundingBoxesIsOn',
                type: 'switch',
                text: 'Bounding boxes',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'detectBlurResponseIsOn',
                type: 'switch',
                text: 'Detect blur response',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'isProduction',
                type: 'switch',
                text: 'Is production',
            },
            {
                setting: 'confidenceDetailsIsOn',
                type: 'switch',
                text: 'Confidence details',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'parseAddressIsOn',
                type: 'switch',
                text: 'Parse address',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
            {
                setting: 'webhookIsOn',
                type: 'switch',
                text: 'Webhook',
                isVisible: () => {
                    const visibleFor = [DocumentTypes.RECEIPT, DocumentTypes.LONG_RECEIPT];
                    return visibleFor.includes(this.documentType);
                }
            },
            {
                setting: 'externalId',
                type: 'text',
                text: 'External ID',
                isVisible: () => {
                    const hideFor = [DocumentTypes.CODE];
                    return !hideFor.includes(this.documentType);
                }
            },
        ];
    },
    computed: {
        filteredGeneralSettings() {
            return this.generalSettings.filter(setting =>
                setting.isVisible == null || (typeof setting.isVisible === 'function' && setting.isVisible())
            );
        },
        filteredImageProcessingSettings() {
            return this.imageProcessingSettings.filter(setting =>
                setting.isVisible == null || (typeof setting.isVisible === 'function' && setting.isVisible())
            );
        },
        filteredUiSettings() {
            return this.uiSettings.filter(setting =>
                setting.isVisible == null || (typeof setting.isVisible === 'function' && setting.isVisible())
            );
        },
        filteredApiSettings() {
            return this.apiSettings.filter(setting =>
                setting.isVisible == null || (typeof setting.isVisible === 'function' && setting.isVisible())
            );
        }
    },
    methods: {
        resetSetting() {
            this.$store.commit('resetSetting', this.documentType);
        },
        handleSwitchChange(setting, value) {
            this.$store.state[this.documentType][setting] = value
        },
        openTextDialog(option) {
            const currentValue = this.$store.state[this.documentType][option.setting];
            var value;
            if (option.setting == "tags" && currentValue != null) {
                value = currentValue.join(",");
            } else if (currentValue != null) {
                value = currentValue;
            } else {
                value = "";
            }

            this.dialogInfo = {
                title: option.text,
                setting: option.setting,
                value: value
            };
            this.showTextDialog = true;
        },
        openColorDialog(option) {
            const value = this.$store.state[this.documentType][option.setting];
            this.dialogInfo = {
                title: option.text,
                setting: option.setting,
                value: value
            };
            this.showColorDialog = true;
        },
        openSliderDialog(option) {
            const value = this.$store.state[this.documentType][option.setting];
            this.dialogInfo = {
                title: option.text,
                setting: option.setting,
                value: value
            };
            this.showSliderDialog = true;
        },
        onCancleDialogClicked() {
            this.dialogInfo = {
                title: '',
                setting: '',
                value: ''
            }
            this.showTextDialog = false;
            this.showColorDialog = false;
            this.showSliderDialog = false;
        },
        onOkTextDialogClicked() {
            const newValue = this.dialogInfo.value;
            if (newValue != "" && this.dialogInfo.setting == "tags") {
                this.$store.state[this.documentType][this.dialogInfo.setting] = newValue.split(",");
            } else if (newValue == "" && this.dialogInfo.setting == "tags") {
                this.$store.state[this.documentType][this.dialogInfo.setting] = null;
            } else {
                this.$store.state[this.documentType][this.dialogInfo.setting] = newValue;
            }
            this.dialogInfo = {
                title: '',
                setting: '',
                value: ''
            }
            this.showTextDialog = false
        },
        onOkColorDialogClicked() {
            const newValue = this.dialogInfo.value;
            this.$store.state[this.documentType][this.dialogInfo.setting] = newValue;
            this.showColorDialog = false;
        },
        onOkSliderDialogClicked() {
            const newValue = this.dialogInfo.value;
            this.$store.state[this.documentType][this.dialogInfo.setting] = newValue;
            this.showSliderDialog = false;
        }
    },
    data() {
        return {
            settings: null,
            generalSettings: null,
            imageProcessingSettings: null,
            uiSettings: null,
            apiSettings: null,
            showTextDialog: false,
            showColorDialog: false,
            showSliderDialog: false,
            dialogInfo: {
                title: '',
                setting: '',
                value: ''
            },
        }
    }
}

</script>