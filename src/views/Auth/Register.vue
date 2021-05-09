<template>
  <div class="authContainer">
    <section class="authForm mt-md radius-md px-md py-md">
      <h1 class="text--center mt-sm mb-md">Sign Up</h1>
      <app-alert v-if="registerError" :message="registerError" type="danger" />
      <div class="mb-md">
        <input
          type="text"
          class="authInput radius-lg"
          placeholder="Full Name"
          @input="nameInput()"
          v-model="form.fullName"
        />
        <p ref="fullNameError" class="input-error">Input error</p>
      </div>

      <div class="mb-md">
        <input
          type="email"
          class="authInput radius-lg"
          placeholder="Email"
          @input="emailInput()"
          v-model="form.email"
        />
        <p ref="emailError" class="input-error">Input error</p>
      </div>
      <div class="mb-md">
        <input
          accept="image/png,image/jpeg"
          type="file"
          id="picture"
          class="authFile radius-lg"
          placeholder="Picture"
          ref="picture"
          @change="choosenImage"
        />
        <label ref="pictureLabel" class="radius-lg" for="picture"
          >Chose a picture (Max 10Mb)</label
        >
        <p ref="pictureError" class="input-error">Input error</p>
      </div>

      <div class="mb-md">
        <input
          type="password"
          class="authInput radius-lg"
          placeholder="Password"
          v-model="form.password"
          @input="passwordInput()"
        />
        <p ref="passwordError" class="input-error">Input error</p>
      </div>
      <div class="mb-md">
        <input
          type="password"
          class="authInput radius-lg"
          placeholder="Password Confirmation"
          v-model="form.passwordConfirmation"
          @input="passwordConfInput()"
        />
        <p ref="passwordConfirmationError" class="input-error">Input error</p>
      </div>
      <button class="btn radius-lg mb-md" @click="Register()">
        <span v-if="!registerLoading">Create Account</span>
        <i v-else class="fas fa-spinner fa-pulse"></i>
      </button>
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
import { mapActions, mapGetters, mapMutations } from "vuex";
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
      Validation: {
        email: false,
        fullName: false,
        picture: null,
        password: false,
        passwordConfirmation: false,
      },
    };
  },
  methods: {
    ...mapActions("auth", ["registerUser"]),
    ...mapMutations("auth", ["setRegisterError"]),
    nameInput() {
      let fullNameError = this.$refs.fullNameError;
      if (
        /^[A-Za-z]*( [A-Za-z]([-']?[A-Za-z]{1,2})*)+$/.test(this.form.fullName)
      ) {
        this.Validation.fullName = true;
        fullNameError.style.display = "none";
      } else {
        fullNameError.innerHTML =
          "Full name must consist of First Name and Last Name";
        fullNameError.style.display = "block";
      }
    },
    choosenImage() {
      let picture = this.$refs.picture.files[0];
      let pictureError = this.$refs.pictureError;
      let pictureLabel = this.$refs.pictureLabel;
      if (picture.size / 1048576 < 10) {
        pictureLabel.innerHTML = picture.name;
        pictureError.style.display = "none";
        this.form.picture = picture;
        this.Validation.picture = true;
      } else {
        pictureLabel.innerHTML = "Chose a picture (Max 10Mb)";
        pictureError.innerHTML = "Picture size over 10Mb!";
        pictureError.style.display = "block";
        this.Validation.picture = false;

        picture = null;
      }
      // console.log(picture);
      // console.log(pictureError);
      // console.log(pictureLabel);
    },
    emailInput() {
      let emailError = this.$refs.emailError;
      if (
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/.test(this.form.email)
      ) {
        emailError.style.display = "none";
        this.Validation.email = true;
      } else {
        emailError.innerHTML = "invalid Email";
        emailError.style.display = "block";
      }
    },
    passwordInput() {
      let passwordError = this.$refs.passwordError;
      if (
        /^(?=.*[0-9])(?=.*[a-z0-9])(?=.*[A-Z0-9])([a-zA-Z0-9]{6,})$/.test(
          this.form.password
        )
      ) {
        passwordError.style.display = "none";
        this.Validation.password = true;
      } else {
        passwordError.innerHTML =
          "Password must be 6 characters and contain at least one Number";
        passwordError.style.display = "block";
      }
    },
    passwordConfInput() {
      let passwordConfError = this.$refs.passwordConfirmationError;
      if (this.form.password === this.form.passwordConfirmation) {
        passwordConfError.style.display = "none";
        this.Validation.passwordConfirmation = true;
      } else {
        passwordConfError.style.display = "block";
        passwordConfError.innerHTML = `Passwords don't match! 🤨 `;
      }
    },
    Register() {
      if (this.form_valid) {
        this.registerUser(this.form);
      }
    },
  },
  computed: {
    ...mapGetters("auth", ["registerError", "registerLoading"]),
    form_valid: function () {
      if (
        this.Validation.email &&
        this.Validation.fullName &&
        this.Validation.picture != false &&
        this.Validation.password &&
        this.Validation.passwordConfirmation
      ) {
        return true;
      }

      return false;
    },
  },
  watch: {
    registerError(val) {
      if (val) {
        setTimeout(() => {
          this.setRegisterError(null);
        }, 3000);
        clearTimeout();
      }
    },
  },
};
</script>

<style>
@import url("../../assets/css/login-register.css");
</style>