<template>
  <section class="loginForm mt-md radius-md px-md py-md">
    <h1 class="text--center my-sm">Login</h1>
    <input type="text" class="loginInput" placeholder="Email" />
    <input type="text" class="loginInput" placeholder="Password" />
    <button class="btn btn-primary radius-md py-md">Sign In</button>
  </section>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style>
@import url("../../Style/Login-Register.css");
</style>