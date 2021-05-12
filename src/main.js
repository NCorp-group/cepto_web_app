// //import { createApp } from 'vue'
// import Vue from 'vue'
// //import App from './App.vue'
// import VueRouter from 'vue-router'

// import LoginScreen from "./components/LoginScreen.vue"
// import LogTable from "./components/LogTable.vue"

// Vue.use(VueRouter)


// new Vue({
//     router
// }).$mount('#app')   

// //export default app;
// //createApp(App).mount('#app');

import { createApp } from 'vue'
import App from './App.vue'
import router from '../router'

createApp(App).use(router).mount('#app')