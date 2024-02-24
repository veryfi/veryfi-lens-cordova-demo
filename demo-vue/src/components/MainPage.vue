<script setup>
import SettingsDialog from './SettingsDialog.vue';
</script>

<template>
    <v-container class="d-flex flex-row justify-center pt-10">
        <img :src="require(`@/assets/ic_veryfi_logo_black.svg`)" width="150" height="auto" class="justify-center" />
    </v-container>

    <v-card class="rounded-lg mx-5 my-2">
        <v-list>
            <v-list-subheader class="text-h6 font-weight-black">Solutions</v-list-subheader>
            <v-list-item v-for="document in documentTypes" :key="document.type" class="py-1" @click="start(document.type)">
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

    <v-bottom-sheet v-model="settingDialogIsOpen">
        <SettingsDialog :document-type="documentTypeSelected" :settings="currentSettings" />
    </v-bottom-sheet>
</template>
<script>
import * as DocumentTypes from '@/constants/document-types';

const vUrl = "XXXX";
const vClientId = "XXXX";
const vUserName = "XXXX";
const vApiKey = "XXXX";
const isDebug = true

export default {
    name: 'MainPage',
    data() {
        return {
            documentTypeSelected: 'None',
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
            logs: []
        };
    },
    mounted() {
        document.addEventListener('deviceready', this.onDeviceReady, false)
    },
    methods: {
        onDeviceReady() {
            this.deviceReady = true
        },
        start(documentType) {
            if (!this.deviceReady) return;
            const settings = this.$store.state[documentType];
            window.cordova.plugins.Veryfi.Lens.init(isDebug, vUrl, vClientId, vUserName, vApiKey, settings);
            window.cordova.plugins.Veryfi.Lens.showCamera(
                function (response) {
                    const jsonResponse = JSON.parse(response);
                    this.logs.push(jsonResponse);
                }, function (error) {
                    console.log(error);
                });
        },
        openSettings(documentType) {
            this.documentTypeSelected = documentType;
            this.currentSettings = this.$store.state[documentType];
            this.settingDialogIsOpen = true
        }
    },
    beforeUnmount() {
        document.removeEventListener('deviceready', this.onDeviceReady, false);
    },
}
</script>