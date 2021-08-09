import { createApp } from 'vue';
import VueHighlight from 'vue3-highlightjs';
import VueMask from '../src/entry';
import App from './App.vue';
import 'spectre.css/src/spectre.scss';

const app = createApp(App);

app.use(VueMask);
app.use(VueHighlight);

app.mount('#app');
