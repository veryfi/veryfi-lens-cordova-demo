<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'

import VirtualReceipt from './virtual-components/VirtualReceipt.vue'
import VirtualCheck from './virtual-components/VirtualCheck.vue'
import VirtualCredirCard from './virtual-components/VirtualCreditCard.vue'
import VirtualBusinessCard from './virtual-components/VirtualBusinessCard.vue'
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

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

                            <VirtualReceipt v-if="showVirtualReceipt" />

                            <VirtualCheck v-else-if="showVirtualCheck" />

                            <VirtualCredirCard v-else-if="showVirtualCreditCard" />

                            <VirtualBusinessCard v-else-if="showVirtualBusinessCard" />

                            <vue-json-pretty v-else :data="dataExtracted" />

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

.image {
    width: auto;
    max-width: 300px;
    margin: 0 auto;
    max-height: 500px;
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
        dataExtracted() {
            return this.$store.state.dataExtracted;
        },
        imgOriginalPath() {
            return this.$store.state.imgOriginalPath;
        },
        showVirtualReceipt() {
            return this.$store.state.documentTypeSelected == DocumentTypes.RECEIPT || this.$store.state.documentTypeSelected == DocumentTypes.LONG_RECEIPT;
        },
        showVirtualCheck() {
            return this.$store.state.documentTypeSelected == DocumentTypes.CHECK;
        },
        showVirtualCreditCard() {
            return this.$store.state.documentTypeSelected == DocumentTypes.CREDIT_CARD;
        },
        showVirtualBusinessCard() {
            return this.$store.state.documentTypeSelected == DocumentTypes.BUSINESS_CARD;
        },
        showLogs() {
            return this.$store.state.documentTypeSelected == DocumentTypes.W2 || this.$store.state.documentTypeSelected == DocumentTypes.W9 || this.$store.state.documentTypeSelected == DocumentTypes.BARCODES || this.$store.state.documentTypeSelected == DocumentTypes.BANK_STATEMENTS
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