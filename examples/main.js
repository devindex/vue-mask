import Vue from 'vue';
import VueMask from 'di-vue-mask';
import App from './App.vue';

Vue.use(VueMask);

new Vue({
    el: '#app',
    render: h => h(App)
});
