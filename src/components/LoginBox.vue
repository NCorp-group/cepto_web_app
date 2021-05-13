<template>
  <div id="login-box">
    <!-- <img src="../assets/logo_small.png" alt="CEPTO"> -->
    <h5>Username</h5>
    <input type="text" name="username" v-model="input.username" placeholder="Username" />
    <h5>Password</h5>
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" @click="on_login">Sign In</button>
  </div>
</template>

<script>
export default {
  name: 'LoginBox',
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

<style scoped>
#login-box {
  height: 300px;
  width: 300px;
  margin: 25vh 0 0 0;
  padding: 50px;
  background-color: #2C2C2C;
  border-radius: 10px;
  box-shadow: 0 3px 6px #191919;
}
#login-box > input {
    border: none;
    width: 280px;
    padding: 10px 10px;
    font-size: 16px;
    margin: 5px 0 20px 0;
    border-radius: 10px;
    background-color: #1A1A1A;
}
#login-box > button {
    border: none;
    padding: 10px;
    width: 100%;
    color: #A9A9A9;
    font-size: 16px;
    border-radius: 10px;
    background-color: #1A1A1A;
    margin: 20px 0 0 0;
}
</style>