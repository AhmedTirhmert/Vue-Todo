<template>
  <div class="auth-container">
    <section class="auth-section mt-md radius-md px-md py-md">
      <h1 class="text_center mt-sm mb-lg">Sign In</h1>
      <app-alert v-if="loginError" :message="loginError" type="danger" />
      <form class="auth-form" @submit.prevent="Login()">
        <div class="mb-md">
          <input
            type="text"
            class="auth-input radius-lg"
            placeholder="Email"
            @input="emailInput()"
            v-model="email"
          />
          <p ref="emailError" class="input-error">Input error</p>
        </div>
        <div class="mb-md">
          <input
            type="password"
            class="auth-input radius-lg"
            v-model="Password"
            placeholder="Password"
            ref="passwordInput"
          />
        </div>

        <button
          :disabled="loginLoading"
          type="submit"
          :class="loginLoading ? 'auth-submit-loading' : ''"
          class="auth-submit btn radius-lg mb-md"
        >
          <span v-if="!loginLoading">Log In</span>
          <i v-else class="fas fa-spinner fa-pulse"></i>
        </button>
        <span class="text_center"
          >New here!<router-link :to="{ name: 'Register' }">
            Sign up now</router-link
          ></span
        >
      </form>
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
      email: null,
      Password: null,
    };
  },
  mounted() {
    if (this.$route.query.email) {
      this.email = this.$route.query.email;
      this.$refs.passwordInput.focus();
    }
  },
  methods: {
    ...mapMutations("auth", ["setLoginError"]),
    ...mapActions("auth", ["loginUser"]),
    emailInput() {
      let emailError = this.$refs.emailError;
      if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/.test(this.email)) {
        emailError.style.display = "none";
      } else {
        emailError.innerHTML = "invalid Email";
        emailError.style.display = "block";
      }
    },
    Login() {
      this.loginUser({
        email: this.email,
        password: this.Password,
      });
    },
  },
  computed: {
    ...mapGetters("auth", ["loginError", "loginLoading"]),
  },
};
</script>

<style scoped>
@import url("../../assets/css/login-register.css");
</style>