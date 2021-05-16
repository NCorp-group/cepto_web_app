<template>
  <div id="login-box">
    <img src="../assets/logo_85_white.png" alt="CEPTO">
    <form spellcheck="false" action="">
      <input @keyup.enter="on_login" type="text" name="username" v-model="input.username" placeholder="Username" />
      <input @keyup.enter="on_login" type="password" name="password" v-model="input.password" placeholder="Password" />
      <p id="feedback" v-bind:style="{ color: feedback.color }">{{ feedback.text }}</p>
      <button class="btn full-width" type="button" @click="on_login">Sign In</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginBox',
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      feedback: {
        color: "transparent",
        text: "No input"
      }
    };
  },
  methods: {
    on_login() {
      if ((this.input.username == "" || this.input.username == null) &&
           this.input.password == "" || this.input.password == null) {
        this.feedback.color = "red";
        this.feedback.text = "No credentials were given";
        
        console.log(this.feedback.text);
      }
      else if(this.check_credentials()) {
        this.$user.username = this.input.username;
        this.$user.password = this.input.password;

        this.$router.push({ path: "/logs" });

        this.feedback.color = "transparent";
        this.feedback.text = "Credentials authenticated";

        console.log(this.feedback.text);

        this.clear_credentials();
      }
      else {
        this.feedback.color = "red";
        this.feedback.text = "Wrong credentials";
        
        console.log(this.feedback.text);
      }
    },
    check_credentials() {
      var is_match = false;
      this.$accounts.forEach(account => {
        if (this.input.username === account.username &&
            this.input.password === account.password) {
          is_match = true;
        }
      });
      return is_match;
    },
    clear_credentials() {
      this.input.username = "";
      this.input.password = "";
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
#feedback {
  color: transparent;
}
</style>