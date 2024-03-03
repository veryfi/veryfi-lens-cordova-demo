<script setup>
import { Vue3Lottie } from 'vue3-lottie';
import LoadingAnimation from '@/assets/loading_animation.json';
import SettingsDialog from './SettingsDialog.vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
</script>

<template>
    <div v-if="!showLoading && !showLogs">
        <v-container class="d-flex flex-row justify-center pt-10">
            <img :src="require(`@/assets/ic_veryfi_logo_black.svg`)" width="150" height="auto" class="justify-center" />
        </v-container>

        <v-card class="rounded-lg mx-5 my-2">
            <v-card-title class="font-weight-bold">Solutions</v-card-title>
            <v-list>
                <v-list-item v-for="document in documentTypes" :key="document.type" @click="start(document.type)">
                    <template v-slot:prepend>
                        <v-img :src="require(`@/assets/${document.icon}`)" :width="24" :height="24" />
                    </template>

                    <v-list-item-title class="mx-2 text-subtitle-1">{{ document.text }}</v-list-item-title>

                    <template v-slot:append>
                        <v-img :src="require(`@/assets/ic_vector_settings.svg`)" :width="24" :height="24"
                            @click.stop="openSettings(document.type)" />
                    </template>
                </v-list-item>
            </v-list>
        </v-card>

        <v-card class="rounded-lg mx-5 my-2 mb-5">
            <v-card-title class="font-weight-bold">Learn & Supported platforms</v-card-title>
            <v-list>
                <v-list-item>
                    <template v-slot:prepend>
                        <v-img :src="require(`@/assets/ic_play.svg`)" :width="24" :height="24" />
                    </template>
                    <v-list-item-title class="mx-2 text-subtitle-1" @click="openBrowser()">Document capture using Veryfi Lens</v-list-item-title>
                </v-list-item>
                <div class="d-flex justify-end my-3 text-center">
                    <v-img :src="require(`@/assets/ic_vector_ios_black.svg`)" class="mt-2" :width="24" :height="12" />
                    <v-img :src="require(`@/assets/ic_vector_android.svg`)" :width="24" :height="24" />
                    <v-img :src="require(`@/assets/ic_vector_flutter.svg`)" :width="24" :height="24" />
                    <v-img :src="require(`@/assets/ic_vector_react.svg`)" :width="24" :height="24" />
                    <v-img :src="require(`@/assets/ic_vector_xamarin.svg`)" :width="24" :height="24" />
                    <v-img :src="require(`@/assets/ic_vector_cordova_black.svg`)" :width="24" :height="24" />
                    <v-img :src="require(`@/assets/ic_vector_ionic.svg`)" :width="24" :height="24" />
                </div>
            </v-list>
        </v-card>

        <v-bottom-sheet v-model="settingDialogIsOpen">
            <SettingsDialog :document-type="documentTypeSelected" :settings="currentSettings" />
        </v-bottom-sheet>
    </div>
    <div v-else-if="showLoading">
        <v-container class="justify-center pt-10 text-center">
            <v-row>
                <v-col>
                    <img :src="require(`@/assets/ic_veryfi_logo_black.svg`)" width="230" height="auto"
                        class="justify-center" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <p class="text-h6 justify-center">Please wait... reading your document.</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <Vue3Lottie :animationData="LoadingAnimation" :height="300" :width="300" />
                </v-col>
            </v-row>
        </v-container>
    </div>
    <div v-else-if="showLogs">
        <v-container class="pt-10">
            <v-row>
                <v-col>
                    <v-icon icon="mdi-close" size="x-large" @click="closeLogs()"></v-icon>
                </v-col>
                <v-col>
                    <p class="text-h5 text-center font-weight-bold">Logs</p>
                </v-col>
                <v-col></v-col>
            </v-row>
            <v-row>
                <v-col>
                    <vue-json-pretty :data="logs" />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import * as DocumentTypes from '@/constants/document-types';

const vUrl = "XXXXX";
const vClientId = "XXXXX";
const vUserName = "XXXXX";
const vApiKey = "XXXXX";
const isDebug = true

export default {
    name: 'MainPage',
    data() {
        return {
            currentSettings: null,
            deviceReady: false,
            settingDialogIsOpen: false,
            documentTypes: [
                {
                    type: DocumentTypes.RECEIPT,
                    icon: "outline_receipt_24.svg",
                    text: "Lens for Receipts & Invoices",
                },
                {
                    type: DocumentTypes.LONG_RECEIPT,
                    icon: "outline_receipt_long_24.svg",
                    text: "Lens for Long Receipts",
                },
                {
                    type: DocumentTypes.CHECK,
                    icon: "outline_fact_check_24.svg",
                    text: "Lens for Checks",
                },
                {
                    type: DocumentTypes.CREDIT_CARD,
                    icon: "outline_credit_card_24.svg",
                    text: "Lens for Credit Cards",
                },
                {
                    type: DocumentTypes.BUSINESS_CARD,
                    icon: "outline_contact_phone_24.svg",
                    text: "Lens for Business Cards",
                },
                {
                    type: DocumentTypes.CODE,
                    icon: "ic_veryfi_lens_ocr.svg",
                    text: "Lens for OCR",
                },
                {
                    type: DocumentTypes.W2,
                    icon: "ic_veryfi_lens_document_capture.svg",
                    text: "Lens for W-2",
                },
                {
                    type: DocumentTypes.W9,
                    icon: "ic_veryfi_lens_document_capture.svg",
                    text: "Lens for W-9",
                },
                {
                    type: DocumentTypes.BANK_STATEMENTS,
                    icon: "ic_bank_statement.svg",
                    text: "Lens for Bank Statements",
                },
                {
                    type: DocumentTypes.BARCODES,
                    icon: "ic_barcode_scan.svg",
                    text: "Lens for Barcodes",
                },
                {
                    type: DocumentTypes.INSURANCE_CARD,
                    icon: "ic_insurance_card.svg",
                    text: "Lens for Insurance Cards",
                },
                {
                    type: DocumentTypes.PASSPORT,
                    icon: "ic_passport.svg",
                    text: "Lens for Passport",
                },
                {
                    type: DocumentTypes.DRIVER_LICENSE,
                    icon: "ic_driver_license.svg",
                    text: "Lens for Driver License",
                },
            ],
            showLogs: false,
            showLoading: false,
        };
    },
    mounted() {
        document.addEventListener('deviceready', this.onDeviceReady, false)
    },
    computed: {
        logs() {
            return this.$store.state.logs
        },
        documentTypeSelected() {
            return this.$store.state.documentTypeSelected
        }
    },
    methods: {
        onDeviceReady() {
            this.deviceReady = true
        },
        openBrowser() {
            window.open("https://www.youtube.com/watch?v=e4dH2An2Tl8", "_system");
        },
        start(documentType) {
            if (!this.deviceReady) return;

            this.$store.state.logs = [];
            this.$store.state.documentTypeSelected = documentType;
            const settings = this.$store.state[documentType];
            window.cordova.plugins.Veryfi.Lens.init(isDebug, vUrl, vClientId, vUserName, vApiKey, settings);
            window.cordova.plugins.Veryfi.Lens.showCamera(
                (response) => {
                    const jsonResponse = JSON.parse(response);
                    this.checkLogs(jsonResponse);
                },
                (error) => {
                    console.log(error);
                });
        },
        openSettings(documentType) {
            this.$store.state.documentTypeSelected = documentType;
            this.currentSettings = this.$store.state[documentType];
            this.settingDialogIsOpen = true
        },
        checkLogs(response) {
            if (this.documentTypeSelected == DocumentTypes.CODE) {
                if (response.event == "veryfi_lens_success") {
                    this.$store.state.dataExtracted = response;
                    this.$router.push('/ocr-extracted-data');
                    this.showLogs = false;
                    this.showLoading = false;
                }
                return
            }
            switch (response.status) {
                case "inprogress":
                    if (!this.showLoading && this.documentTypeSelected != DocumentTypes.CREDIT_CARD || this.documentTypeSelected != DocumentTypes.BARCODES) this.showLoading = true;
                    this.checkInProgress(response);
                    break;
                case "error":
                    this.showErrorLogs();
                    break;
                case "done":
                    this.showResults(response);
                    break;
            }
            this.$store.state.logs.push(response);
        },
        showErrorLogs() {
            this.showLogs = true;
            this.showLoading = false;
        },
        closeLogs() {
            this.showLogs = false;
            this.showLoading = false;
            this.documentTypeSelected = '';
            this.$store.state.logs = [];
        },
        showResults(response) {
            this.$store.state.dataExtracted = response.data;
            this.$router.push('/extracted-data');
            this.showLogs = false;
            this.showLoading = false;
        },
        checkInProgress(response) {
            if (response.msg == "img_original_path") {
                this.$store.state.imgOriginalPath = response.data;
            }
        }
    },
    beforeUnmount() {
        document.removeEventListener('deviceready', this.onDeviceReady, false);
    },
}
</script>