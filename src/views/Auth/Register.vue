<template>
  <div class="authContainer">
    <section class="authForm mt-md radius-md px-md py-md">
      <h1 class="text--center mt-sm mb-xl">Sign Up</h1>
      <!-- <div class="authFields"> -->
      <input
        type="text"
        class="authInput radius-lg mb-md"
        placeholder="Full Name"
      />
      <input
        type="text"
        class="authInput radius-lg mb-md"
        placeholder="Email"
      />
      <input
        accept="image/png,image/jpeg"
        type="file"
        id="picture"
        class="authFile radius-lg mb-md"
        placeholder="Picture"
        ref="picture"
        @change="choosenImage"
      />
      <label class="radius-lg mb-md" for="picture">Chose a picture</label>

      <input
        type="password"
        class="authInput radius-lg mb-md"
        placeholder="Password"
      />
      <input
        type="password"
        class="authInput radius-lg mb-md"
        placeholder="Password Confirmation"
      />
      <button class="btn radius-lg py-sm mb-md">Create Account</button>
      <span class="text--center"
        >Already have an account?<router-link to="/login">
          Sign In</router-link
        ></span
      >
      <!-- </div> -->
    </section>
  </div>
</template>

<script>
export default {
  name: "Register",
  methods: {
    choosenImage() {
      console.log(this.$refs.picture.files);
    },
  },
};
</script>

<style>
@import url("../../Style/Login-Register.css");
</style>