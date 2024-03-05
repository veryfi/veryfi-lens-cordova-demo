import store from './store';
import App from './App.vue';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import '@mdi/font/css/materialdesignicons.css';

// Routes
import MainPage from './components/MainPage.vue';
import ExtractedDataPage from './components/ExtractedDataPage.vue';
import ConsolePage from './components/ConsolePage.vue';
import OCRExtractedDataPage from './components/OCRExtractedDataPage.vue';

const routes = [
    { path: '/', name: 'Main', component: MainPage },
    { path: '/extracted-data', name: 'Extracted data', component: ExtractedDataPage },
    { path: '/console', name: 'Lens console', component: ConsolePage },
    { path: '/ocr-extracted-data', name: 'OCR Extracted Data', component: OCRExtractedDataPage },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives
});

createApp(App)
    .use(router)
    .use(store)
    .use(vuetify)
    .mount('#app');