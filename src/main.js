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

const app = createApp(App);

app.config.globalProperties.$username = "";
app.config.globalProperties.$password = "";

app.use(router).mount('#app')
// createApp(App).use(router).mount('#app')