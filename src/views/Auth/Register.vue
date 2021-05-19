<template>
  <div class="auth-container">
    <section class="auth-section mt-md radius-md px-md py-md">
      <h1 class="text_center mt-sm mb-md">Sign Up</h1>
      <app-alert
        v-if="response.message"
        :message="response.message"
        :type="response.type"
      />
      <form class="auth-form" @submit.prevent="register">
        <div class="mb-md">
          <input
            type="text"
            class="auth-input radius-lg"
            placeholder="Full Name"
            @input="nameValidation"
            v-model="form.fullName"
          />
          <p ref="fullNameError" class="input-error"></p>
        </div>

        <div class="mb-md">
          <input
            type="email"
            class="auth-input radius-lg"
            placeholder="Email"
            @input="emailValidation"
            v-model="form.email"
          />
          <p ref="emailError" class="input-error"></p>
        </div>
        <div class="mb-md">
          <input
            accept="image/png,image/jpeg"
            type="file"
            id="picture"
            class="auth-file radius-lg"
            ref="picture"
            @change="pictureValidation"
          />
          <label ref="pictureLabel" class="radius-lg" for="picture"
            >Chose a picture (Max 10Mb)</label
          >
          <p ref="pictureError" class="input-error"></p>
        </div>

        <div class="mb-md">
          <input
            type="password"
            class="auth-input radius-lg"
            placeholder="Password"
            v-model="form.password"
            @input="passwordValidation"
          />
          <p ref="passwordError" class="input-error"></p>
        </div>
        <div class="mb-md">
          <input
            type="password"
            class="auth-input radius-lg"
            placeholder="Password Confirmation"
            v-model="form.passwordConfirmation"
            @input="passwordConfValidation"
          />
          <p ref="passwordConfirmationError" class="input-error"></p>
        </div>
        <button
          :disabled="loading"
          :class="loading ? 'auth-submit-loading' : ''"
          type="submit"
          class="auth-submit btn radius-lg mb-md"
        >
          <span v-if="!loading">Create Account</span>
          <i v-else class="fas fa-spinner fa-pulse"></i>
        </button>
        <span class="text_center"
          >Already have an account?<router-link :to="{ name: 'Login' }">
            Sign In</router-link
          ></span
        >
      </form>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: { AppAlert: () => import("@/components/AppAlert.vue") },
  name: "Register",
  data() {
    return {
      form: {
        email: null,
        fullName: null,
        password: null,
        picture: null,
        passwordConfirmation: null,
      },
      validation: {
        email: false,
        fullName: false,
        picture: null,
        password: false,
        passwordConfirmation: false,
      },
      loading: false,
      response: {
        type: null,
        message: null,
      },
    };
  },
  mounted() {
    this.response.message = null;
  },
  methods: {
    ...mapActions("auth", ["registerUser"]),
    nameValidation() {
      let fullNameError = this.$refs.fullNameError;
      if (
        /^[A-Za-z]*( [A-Za-z]([-']?[A-Za-z]{1,2})*)+$/.test(this.form.fullName)
      ) {
        this.validation.fullName = true;
        fullNameError.style.display = "none";
      } else {
        fullNameError.innerHTML =
          "Full name must consist of First Name and Last Name";
        fullNameError.style.display = "block";
      }
    },
    pictureValidation() {
      let picture = this.$refs.picture.files[0];
      let pictureError = this.$refs.pictureError;
      let pictureLabel = this.$refs.pictureLabel;
      if (picture.size / 1048576 < 10) {
        pictureLabel.innerHTML = picture.name;
        pictureError.style.display = "none";
        this.form.picture = picture;
        this.validation.picture = true;
      } else {
        pictureLabel.innerHTML = "Chose a picture (Max 10Mb)";
        pictureError.innerHTML = "Picture size over 10Mb!";
        pictureError.style.display = "block";
        this.validation.picture = false;
      }
    },
    emailValidation() {
      let emailError = this.$refs.emailError;
      if (
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/.test(this.form.email)
      ) {
        emailError.style.display = "none";
        this.validation.email = true;
      } else {
        emailError.innerHTML = "invalid Email";
        emailError.style.display = "block";
      }
    },
    passwordValidation() {
      let passwordError = this.$refs.passwordError;
      if (
        /^(?=.*[0-9])(?=.*[a-z0-9])(?=.*[A-Z0-9])([a-zA-Z0-9]{6,})$/.test(
          this.form.password
        )
      ) {
        passwordError.style.display = "none";
        this.validation.password = true;
      } else {
        passwordError.innerHTML =
          "Password must be 6 characters and contain at least one Number";
        passwordError.style.display = "block";
      }
    },
    passwordConfValidation() {
      let passwordConfError = this.$refs.passwordConfirmationError;
      if (this.form.password === this.form.passwordConfirmation) {
        passwordConfError.style.display = "none";
        this.validation.passwordConfirmation = true;
      } else {
        passwordConfError.style.display = "block";
        passwordConfError.innerHTML = `Passwords don't match! 🤨 `;
      }
    },
    async register() {
      try {
        if (this.form_valid) {
          this.loading = true;
          this.response.message = null;
          await this.registerUser({
            email: this.form.email,
            password: this.form.password,
            fullName: this.form.fullName,
            profilePicture: this.form.picture,
          });
          this.loading = false;
          this.response.type = "success";
          this.response.message = "Verification link sent to your Email 🙂";
        }
      } catch (error) {
        this.loading = false;
        this.response.type = "danger";
        this.response.message = error.message;
      }
    },
  },
  computed: {
    form_valid: function () {
      if (
        this.validation.email &&
        this.validation.fullName &&
        this.validation.picture != false &&
        this.validation.password &&
        this.validation.passwordConfirmation
      ) {
        return true;
      }

      return false;
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/login-register.css");
</style>