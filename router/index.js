import { createRouter, createWebHistory } from 'vue-router'
import LoginScreen from '../views/LoginScreen.vue'
import LogsScreen from '../views/LogsScreen.vue'

const routes = [
    {
        path: '/',
        redirect: { name: "login" }
    },
    {
        path: "/login",
        name: "login",
        component: LoginScreen,
        meta: { transition: 'slide-fade-right' }
    },
    {
        path: "/logs",
        name: "logs",
        component: LogsScreen,
        meta: { transition: 'slide-fade-left' }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router