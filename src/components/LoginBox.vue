<template>
  <div id="login-box">
  <img src="../assets/logo_85_white.png" alt="CEPTO">
  <input type="text" name="username" v-model="input.username" placeholder="Username" />
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
  height: 400px;
  width: 300px;
  margin: 25vh 0 0 0;
  padding: 50px;
  background-color: #2C2C2C;
  border-radius: 10px;
  box-shadow: 0 3px 6px #191919;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#login-box > input {
  border: none;
  width: 280px;
  padding: 10px 10px;
  font-size: 16px;
  border-bottom: 2px solid #43b2e4;
  background-color: #2C2C2C;
  caret-color: white;
  color: white;
}
#login-box > input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #2C2C2C inset;
  -webkit-text-fill-color: white;
}
#login-box > button {
  border: none;
  padding: 10px;
  width: 100%;
  color: white;
  font-size: 16px;
  border-radius: 10px;
  background: linear-gradient(200deg, rgba(67, 178, 228, 0), rgba(67, 178, 228, 0.8) 100%),
              linear-gradient(20deg, rgba(34, 43, 98, 0), rgba(34, 43, 98, 0.7) 70%),
              linear-gradient(120deg, rgba(67, 178, 228, 0), rgba(67, 178, 228, 1)),
              linear-gradient(320deg, rgba(34, 43, 98, 0), rgba(34, 43, 98, 1));
  box-shadow: 0 3px 6px #191919;
  transition: ease-in-out 100ms;
}
#login-box > button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px #191919;
}
#login-box > button:active {
  transform: translateY(4px);
  box-shadow: 0 1px 2px #191919;
}
</style>