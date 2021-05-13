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
        meta: { transition: 'fade' }
    },
    {
        path: "/logs",
        name: "logs",
        component: LogsScreen,
        meta: { transition: 'slide-down' }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// function determine_transition() {
//     router.afterEach((to, from) => {
//         const toDepth = to.path.split('/').length
//         const fromDepth = from.path.split('/').length
//         to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
//     })
// }

export default router