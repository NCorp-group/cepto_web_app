import { createApp } from 'vue'
import App from './App.vue'
import router from '../router'

const app = createApp(App);

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
    ip: "10.9.0.221",
    command: "fecth-events"
}

app.use(router).mount('#app')