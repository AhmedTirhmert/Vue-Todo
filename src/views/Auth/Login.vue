<template>
  <div class="authContainer">
    <section class="authForm mt-md radius-md px-md py-md">
      <h1 class="text--center mt-sm mb-xl">Sign In</h1>
      <!-- <div class="authFields"> -->
      <input
        type="text"
        class="authInput radius-lg mb-md"
        placeholder="Email"
      />
      <input
        type="password"
        class="authInput radius-lg mb-md"
        placeholder="Password"
      />
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
};
</script>

<style>
@import url("../../Style/Login-Register.css");
</style>