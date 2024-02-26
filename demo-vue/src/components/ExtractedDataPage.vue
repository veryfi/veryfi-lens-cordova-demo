<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
</script>
<template>
    <v-container class="mt-5">
        <v-row>
            <v-col>
                <p class="text-h6 text-center font-weight-bold">{{ title }}</p>
            </v-col>
        </v-row>
        <v-row class="h-75">
            <v-col>
                <Carousel>
                    <Slide v-for="slide in 2" :key="slide" class="carousel-item">
                        <div v-if="slide == 1">

                            <div v-if="showVirtualReceipt">

                                <div class="receipt zig-zag zig-zag-top zig-zag-bottom">
                                    <img :src="dataExtracted.vendor.logo" width="90" height="90" class="vendor" />
                                    <p class="text-body-2 font-weight-bold">{{ dataExtracted.vendor.name }}</p>
                                    <p class="text-body-2">{{ dataExtracted.vendor.address }}</p>
                                    <p class="text-body-2">{{ dataExtracted.vendor.phone_number }}</p>
                                    <div class="divider"></div>
                                    <p class="text-body-2">{{ dataExtracted.date }}</p>
                                    <div class="divider"></div>
                                    <div v-if="dataExtracted.category != null" class="d-flex flex-row justify-start">
                                        <p class="text-body-2">Category: </p>
                                        <p class="text-body-2 ms-1">{{ dataExtracted.category }}</p>
                                    </div>
                                    <div class="divider"></div>

                                    <div class="d-flex flex-row pa-0 ma-0" v-for="(item, i) in dataExtracted.line_items" :key="i">
                                        <p class="text-body-2 font-weight-bold">{{ item.quantity }}</p>
                                        <p class="text-body-2 font-weight-bold ms-3 me-auto">
                                            {{ item.description }}
                                        </p>
                                        <p class="text-body-2 font-weight-bold">{{ item.total }}</p>
                                    </div>

                                    <div v-if="dataExtracted.line_items.length > 0" class="divider"></div>
                                    <div class="d-flex flex-row justify-space-between">
                                        <p class="text-body-2">Subtotal:</p>
                                        <p class="text-body-2">{{ dataExtracted.subtotal }}</p>
                                    </div>
                                    <div class="d-flex flex-row justify-space-between">
                                        <p class="text-body-2">Tax:</p>
                                        <p class="text-body-2">{{ dataExtracted.tax }}</p>
                                    </div>
                                    <div class="d-flex flex-row justify-space-between">
                                        <p class="text-body-2">Tip:</p>
                                        <p class="text-body-2">{{ dataExtracted.tip }}</p>
                                    </div>
                                    <div class="d-flex flex-row justify-space-between">
                                        <p class="text-body-2 font-weight-bold">Total:</p>
                                        <p class="text-body-2 font-weight-bold">{{ dataExtracted.total }}</p>
                                    </div>
                                    <div class="divider"></div>
                                    <div class="d-flex flex-row justify-space-between">
                                        <p class="text-body-2">Currency:</p>
                                        <p class="text-body-2">{{ dataExtracted.currency_code }}</p>
                                    </div>
                                    <div class="d-flex flex-row justify-space-between">
                                        <p class="text-body-2">Payment:</p>
                                        <p class="text-body-2">{{ dataExtracted.payment.display_name }}</p>
                                    </div>
                                    <div class="divider"></div>
                                    <div class="d-flex flex-row justify-space-between">
                                        <p class="text-body-2">Reference #:</p>
                                        <p class="text-body-2">{{ dataExtracted.reference_number }}</p>
                                    </div>
                                    <div class="d-flex flex-row justify-space-between">
                                        <p class="text-body-2">Invoice #:</p>
                                        <p class="text-body-2">{{ dataExtracted.invoice_number }}</p>
                                    </div>
                                </div>

                            </div>

                            <div v-else-if="showVirtualCheck">

                                <div>
                                    Check data
                                </div>

                            </div>

                        </div>

                        <div v-else-if="slide == 2">
                            <img :src="imagePath" class="image">
                        </div>
                    </Slide>
                    <template #addons>
                        <Pagination />
                    </template>
                </Carousel>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn class="font-weight-bold retry-button w-100" variant="flat" @click="retry()">
                    RETRY
                </v-btn>
                <br>
                <v-btn class="font-weight-bold w-100 mt-2" variant="outlined" @click="showExtractedData()">
                    SHOW EXTRACTED DATA
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>
.retry-button {
    border-radius: 5px;
    font-size: medium;
    background-image: linear-gradient(to right,
            #00FA6C,
            #2DB5D2);
}

.receipt {
    width: 270px;
    padding: 10px;
    max-height: 500px;
    -webkit-box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 2px;
    overflow: scroll;
}

.zig-zag {
    background: #FFF;
    position: relative;
}

.zig-zag-top:before,
.zig-zag-bottom:after {
    background-repeat: repeat-x;
    content: " ";
    display: block;
    height: 32px;
    width: 100%;
    position: absolute;
    z-index: 0;
    left: 0;
}

.zig-zag-top:before {
    background:
        linear-gradient(-45deg, #FFF 16px, red 16px, blue 16px, transparent 0),
        linear-gradient(45deg, #FFF 16px, transparent 0);
    background-size: 22px 32px;
    background-position: left top;
    top: -30px;
}

.zig-zag-bottom:after {
    background:
        linear-gradient(-135deg, #FFF 16px, red 16px, blue 16px, transparent 0),
        linear-gradient(135deg, #FFF 16px, transparent 0);
    background-position: left bottom;
    background-size: 22px 32px;
}

.vendor {
    width: 90px;
    height: 90;
    border-radius: 50%;
    border: 3px solid black;
    object-fit: cover;
}

.image {
    width: auto;
    max-width: 300px;
    margin: 0 auto;
    max-height: 500px;
}

.divider {
    height: 1px;
    width: 100%;
    background-color: #aaa;
    margin: 3px 0;
}
</style>
<script>
import * as DocumentTypes from '@/constants/document-types';

export default {
    name: 'ExtractedDataPage',
    computed: {
        title() {
            var documentTitle = "";
            switch (this.$store.state.documentTypeSelected) {
                case DocumentTypes.RECEIPT:
                    documentTitle = "Receipt & Incoives";
                    break;
                case DocumentTypes.LONG_RECEIPT:
                    documentTitle = "Long Receipt";
                    break;
                case DocumentTypes.CHECK:
                    documentTitle = "Check";
                    break;
                case DocumentTypes.CREDIT_CARD:
                    documentTitle = "Credit Card";
                    break;
                case DocumentTypes.BUSINESS_CARD:
                    documentTitle = "Business Card";
                    break;
                case DocumentTypes.CODE:
                    documentTitle = "Code";
                    break;
                case DocumentTypes.W2:
                    documentTitle = "W2";
                    break;
                case DocumentTypes.W9:
                    documentTitle = "W9";
                    break;
                case DocumentTypes.BANK_STATEMENTS:
                    documentTitle = "Bank Statements";
                    break;
                case DocumentTypes.BARCODES:
                    documentTitle = "Barcodes";
                    break;
                case DocumentTypes.INSURANCE_CARD:
                    documentTitle = "Insurance Card";
                    break;
                case DocumentTypes.PASSPORT:
                    documentTitle = "Passport";
                    break;
                case DocumentTypes.DRIVER_LICENSE:
                    documentTitle = "Driver License";
                    break;
            }
            return documentTitle;
        },
        imgOriginalPath() {
            return this.$store.state.imgOriginalPath;
        },
        dataExtracted() {
            return this.$store.state.dataExtracted;
        },
        showVirtualReceipt() {
            return this.$store.state.documentTypeSelected == DocumentTypes.RECEIPT || this.$store.state.documentTypeSelected == DocumentTypes.LONG_RECEIPT;
        },
        showVirtualCheck() {
            return false;
        }
    },
    mounted() {
        const data = { data: this.imgOriginalPath }
        window.cordova.plugins.Veryfi.Lens.getFileBase64(data,
            (data64) => {
                this.imagePath = "data:image/jpeg;base64," + data64;
            },
            (error) => {
                console.log("Error: " + error);
            });
    },
    methods: {
        showExtractedData() {
            this.$router.push("/console");
        },
        retry() {
            this.$router.back();
        }
    },
    data() {
        return {
            imagePath: ''
        }
    }
}
</script>