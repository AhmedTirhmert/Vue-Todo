<template>
  <div class="authContainer">
    <section class="authForm mt-md radius-md px-md py-md">
      <h1 class="text--center mt-sm mb-lg">Sign In</h1>
      <app-alert v-if="loginError" :message="loginError" type="danger" />
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
          ref="passwordInput"
        />
      </div>

      <button class="btn radius-lg mb-md" @click="Login()">
        <span v-if="!loginLoading">Log In</span>
        <i v-else class="fas fa-spinner fa-pulse"></i>
      </button>
      <span class="text--center"
        >New here!<router-link to="/register"> Sign up now</router-link></span
      >
      <!-- </div> -->
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Login",
  components: {
    AppAlert: () => import("@/components/AppAlert"),
  },
  data() {
    return {
      Email: null,
      Password: null,
    };
  },
  mounted() {
    if (this.$route.query.email) {
      this.Email = this.$route.query.email;
      this.$refs.passwordInput.focus();
    }
  },
  methods: {
    ...mapMutations("AuthStore", ["setLoginError"]),
    ...mapActions("AuthStore", ["loginUser"]),
    emailInput() {
      let emailError = this.$refs.emailError;
      if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/.test(this.Email)) {
        emailError.style.display = "none";
      } else {
        emailError.innerHTML = "invalid Email";
        emailError.style.display = "block";
      }
    },
    Login() {
      this.loginUser({
        email: this.Email,
        password: this.Password,
      });
    },
  },
  computed: {
    ...mapGetters("AuthStore", ["loginError", "loginLoading"]),
  },
  watch: {
    loginError(val) {
      if (val) {
        setTimeout(() => {
          this.setLoginError(null);
        }, 2000);
        clearTimeout();
      }
    },
  },
};
</script>

<style>
@import url("../../style/Login-Register.css");
</style>