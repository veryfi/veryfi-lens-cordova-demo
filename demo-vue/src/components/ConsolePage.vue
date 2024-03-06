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
                <p class="text-h6 text-center font-weight-bold">Lens console</p>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex flex-row justify-space-between">
                <v-btn :class="showExtractedData ? `button-selected` : `button-unselected`" @click="showExtractedData = true">Extracted data</v-btn>
                <v-btn :class="!showExtractedData ? `button-selected` : `button-unselected`" @click="showExtractedData = false">Json</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-if="showExtractedData">
                <v-card title="Extracted fields">
                    <v-card-text>
                        <div v-for="(value, key) in extractedFields" :key="key" class="d-flex flex-box justify-space-between">
                            <p class="key">{{ key.split('_').join(' ') }}</p>
                            <p>{{ value }}</p>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col v-else>
                <vue-json-pretty :data="logs" />
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>

.button-selected {
    width: 48%;
    background-color: #00AA00;
    color: #FFFFFF;
    font-size: 16px;
    text-transform: capitalize;
}

.button-unselected {
    width: 48%;
    background-color: #173835;
    color: #00AA00;
    font-size: 16px;
    text-transform: capitalize;
}

.key {
    text-transform: capitalize;
}

</style>
<script>
export default {
    name: 'ConsolePage',
    created() {
        this.dataExtracted = this.$store.state.dataExtracted;
    },
    computed: {
        extractedFields() {
            let fields = {};

            for (const [key, value] of Object.entries(this.dataExtracted)) {
                if (typeof value !== 'object') {
                    fields[key] = value
                }
            }

            return fields
        },
        logs() {
            return this.$store.state.logs;
        }
    },
    methods: {
        goBack() {
            this.$router.back();
        }
    },
    data() {
        return {
            dataExtracted: null,
            showExtractedData: true
        }
    }
}
</script>