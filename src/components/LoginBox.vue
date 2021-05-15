<template>
  <div id="login-box">
    <img src="../assets/logo_85_white.png" alt="CEPTO">
    <form spellcheck="false" action="">
      <input type="text" name="username" v-model="input.username" placeholder="Username" />
      <input type="password" name="password" v-model="input.password" placeholder="Password" />
      <router-link to="/logs">
        <button class="btn full-width" type="button" @click="on_login">Sign In</button>
      </router-link>
    </form>
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
      this.$input.username = this.input.username;
      this.$input.password = this.input.password;
    }
  }
}
</script>

<style scoped>
#login-box {
  height: 350px;
  margin: 25vh 0 0 0;
  padding: 50px;
  background-color: #2C2C2C;
  border-radius: 10px;
  box-shadow: 0 3px 6px #191919;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#login-box > form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#login-box > form > input {
  border: none;
  width: 280px;
  padding: 10px 10px;
  margin: 15px 0px;
  font-size: 16px;
  border-bottom: 2px solid #43b2e4;
  background-color: #2C2C2C;
  caret-color: white;
  color: white;
}
#login-box > form > input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #2C2C2C inset;
  -webkit-text-fill-color: white;
}
#login-box > form > a > button {
  margin: 60px 0 0 0;
}
</style>