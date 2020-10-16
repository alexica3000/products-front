import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery';
import 'popper.js/dist/popper.min';
import './assets/style.css';

createApp(App).use(router).mount('#app')
