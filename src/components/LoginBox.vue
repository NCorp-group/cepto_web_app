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
      // Input object
      // Stores the provided credentials temporarily for authorisation
      input: {
        username: "",
        password: ""
      },
      // Feedback object
      // Bound to the paragraph <p></p> element with v-bind
      // Determines text and its colour
      feedback: {
        color: "transparent",
        text: "No input"
      }
    };
  },
  methods: {
    // Sign in callback method
    // Is called when "Sign In" button is pressed or when enter is pressed in either input field "username" or "password"
    // Gives the user feedback on the credentials they have put in
    on_login() {
      // Case: The user has provided no credentials
      if ((this.input.username == "" || this.input.username == null) &&
           this.input.password == "" || this.input.password == null) {
        
        // Update feedback message
        this.feedback.color = "red";
        this.feedback.text = "No credentials were given";
        
        console.log(this.feedback.text);
      }
      // Case: The credentials the user has provided matches a user in the system
      // Done with a call to the check_credentials method
      else if(this.check_credentials()) {
        // Store the provided credentials in the global variables
        this.$user.username = this.input.username;
        this.$user.password = this.input.password;

        // Route the user to LogsScreen.vue
        this.$router.push({ path: "/logs" });

        // Update feedback message
        this.feedback.color = "transparent";
        this.feedback.text = "Credentials authenticated";

        console.log(this.feedback.text);

        this.clear_credentials();
      }
      // Case: The user provides wrong credentials
      else {
        // Update feedback message
        this.feedback.color = "red";
        this.feedback.text = "Wrong credentials";
        
        console.log(this.feedback.text);
      }
    },
    // Credential checker
    // Checks whether the provided credentials match with registered users
    check_credentials() {
      // Expects no match
      var is_match = false;
      // Look for match in global accounts list
      this.$accounts.forEach(account => {
        // Case: Match found, update bool to true
        if (this.input.username === account.username &&
            this.input.password === account.password) {
          is_match = true;
        }
      });
      // Return access bool to caller
      return is_match;
    },
    // Clears the input fields
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