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
            <v-col>
                <vue-json-pretty :data="logs" />
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: 'ConsolePage',
    computed: {
        logs() {
            return this.$store.state.logs
        }
    },
    methods: {
        goBack() {
            this.$router.back();
        }
    }
}
</script>