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

// app.config.globalProperties.$input.username = "";
// app.config.globalProperties.$input.password = "";

app.config.globalProperties.$user = {
    username: "",
    password: ""
}

app.config.globalProperties.$accounts = [
    {
        username: "caregiver",
        password: "caregiver"
    },
    {
        username: "test",
        password: "test"
    }
]

app.config.globalProperties.$http = {
    ip: "localhost",
    command: "fecth-events"
}

app.use(router).mount('#app')
// createApp(App).use(router).mount('#app')