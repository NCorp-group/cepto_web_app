//import { createApp } from 'vue'
import Vue from 'vue'
//import App from './App.vue'
import VueRouter from 'vue-router'

import LoginScreen from "./components/LoginScreen.vue"
import LogTable from "./components/LogTable.vue"

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginScreen
        },
        {
            path: "/logs",
            name: "logs",
            component: LogTable
        }
    ]
});

const app = new Vue({
    router
}).$mount('#app')   

export default app;
//createApp(App).mount('#app');