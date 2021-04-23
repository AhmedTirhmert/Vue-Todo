<template>
  <div class="authContainer">
    <section class="authForm mt-md radius-md px-md py-md">
      <h1 class="text--center mt-sm mb-xl">Sign In</h1>
      <!-- <div class="authFields"> -->
      <div class="mb-md">
        <input
          type="text"
          class="authInput radius-lg"
          placeholder="Email"
          @input="emailInput()"
          v-model="Email"
        />
        <p ref="emailError" class="input-error">Input error</p>
      </div>
      <div class="mb-md">
        <input
          type="password"
          class="authInput radius-lg"
          v-model="Password"
          placeholder="Password"
        />
      </div>

      <button class="btn radius-lg py-sm mb-md">Login</button>
      <span class="text--center"
        >New here!<router-link to="/register"> Sign up now</router-link></span
      >
      <!-- </div> -->
    </section>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      Email: null,
      Password: null,
    };
  },
  methods: {
    emailInput() {
      let emailError = this.$refs.emailError;
      if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/.test(this.Email)) {
        emailError.style.display = "none";
      } else {
        emailError.innerHTML = "invalid Email";
        emailError.style.display = "block";
      }
    },
  },
};
</script>

<style>
@import url("../../Style/Login-Register.css");
</style>