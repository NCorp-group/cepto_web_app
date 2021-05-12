<template>
    <div class="container center-content">
        <div id="login-box">
            <h5>Username</h5>
            <input type="text" name="username" v-model="input.username" placeholder="Username" />

            <h5>Password</h5>
            <input type="password" name="password" v-model="input.password" placeholder="Password" />

            <button type="button" @click="on_login">Login</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginScreen',
    data() {
        return {input: {username: "", password: ""}};
    },
    methods: {
        on_login() {
            return;
        }
    }
}
</script>

<style>
#login-box {
    height: 400px;
    width: 300px;
}
</style>