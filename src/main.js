import { createApp } from 'vue'
import App from './App.vue'
import router from '../router'

const app = createApp(App);

// Current user global property
app.config.globalProperties.$user = {
    username: "",
    password: ""
}

// List of registered users
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

// HTTP GET request information
// Change "localhost" to the server location ip
app.config.globalProperties.$http = {
    ip: "localhost",
    port: "5000",
    command: "fecth-events"
}

// Tell the Vue instance to use the defined router in ../router/index.js
// Mount the instance to the HTML element with the ID of app - see ../public/index.html
app.use(router).mount('#app')