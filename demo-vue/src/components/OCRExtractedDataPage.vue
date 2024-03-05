<script setup>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
</script>
<template>
     <v-container class="pt-10">
        <v-row>
            <v-col cols="1">
                <v-icon icon="mdi-arrow-left" size="x-large" @click="goBack()"></v-icon>
            </v-col>
            <v-col cols="10">
                <p class="text-h6 text-center font-weight-bold">Lens for OCR</p>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row>
            <v-col>
                <img :src="imagePath" width="350" class="image">
            </v-col>
        </v-row>
        <v-row class="text-center">
            <v-col>
                <v-card title="OCR Details" width="350">
                    <v-card-text>
                        <div class="d-flex flex-row justify-space-between">
                            <p>UUID</p>
                            <p>{{ dataExtracted.ocr_uuid }}</p>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <p>Text</p>
                            <p>{{ dataExtracted.ocr_text }}</p>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <p>Score</p>
                            <p>{{ dataExtracted.ocr_score }}</p>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <vue-json-pretty :data="dataExtracted" />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.image {
    border-radius: 20px;
}
</style>

<script>

export default {
    name: 'OCRExtractedDataPage',
    computed: {
        dataExtracted() {
            return this.$store.state.dataExtracted;
        },
        imgOriginalPath() {
            return this.$store.state.dataExtracted.ocr_image;
        },
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
        goBack() {
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