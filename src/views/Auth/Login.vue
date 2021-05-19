<template>
  <div class="auth-container">
    <section class="auth-section mt-md radius-md px-md py-md">
      <h1 class="text_center mt-sm mb-lg">Sign In</h1>
      <app-alert
        v-if="response.message"
        :message="response.message"
        :type="response.type"
      />
      <form class="auth-form" @submit.prevent="login">
        <div class="mb-md">
          <input
            type="text"
            class="auth-input radius-lg"
            placeholder="Email"
            @input="emailValidation()"
            v-model="email"
          />
          <p ref="emailError" class="input-error">Input error</p>
        </div>
        <div class="mb-md">
          <input
            type="password"
            class="auth-input radius-lg"
            v-model="password"
            placeholder="Password"
            ref="passwordInput"
          />
        </div>

        <button
          :disabled="loading"
          type="submit"
          :class="loading ? 'auth-submit-loading' : ''"
          class="auth-submit btn radius-lg mb-md"
        >
          <span v-if="!loading">Log In</span>
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
import { mapActions } from "vuex";
export default {
  name: "Login",
  components: {
    AppAlert: () => import("@/components/AppAlert"),
  },
  data() {
    return {
      email: null,
      password: null,
      loading: false,
      response: {
        type: null,
        message: null,
      },
    };
  },
  mounted() {
    if (this.$route.query.email) {
      this.email = this.$route.query.email;
      this.$refs.passwordInput.focus();
    }
    this.loading = false;
    this.response.type = null;
    this.response.message = null;
  },
  methods: {
    ...mapActions("auth", ["loginUser"]),
    emailValidation() {
      let emailError = this.$refs.emailError;
      if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/.test(this.email)) {
        emailError.style.display = "none";
      } else {
        emailError.innerHTML = "invalid Email";
        emailError.style.display = "block";
      }
    },
    async login() {
      try {
        this.loading = true;
        await this.loginUser({
          email: this.email,
          password: this.password,
        });
        this.loading=false
      } catch(error) {
        console.log(error);
        this.loading=false
        this.response.message=error
        this.response.type="danger"
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
@import url("../../assets/css/login-register.css");
</style>