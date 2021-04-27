<template>
  <section class="">
    <h2 class="color--heading1 mb-md">Profile</h2>
    <div class="profile-section radius-sm py-lg px-lg">
      <app-alert
        v-if="profileError.message"
        :message="profileError.message"
        :type="profileError.type"
      />
      <div class="profile-input-container">
        <label>Full Name</label>
        <div class="profile-input-section">
          <input
            type="text"
            class="profile-input"
            v-model="profileInfos.fullName"
          />
          <p ref="fullNameError" class="input-error"></p>
        </div>
      </div>
      <div class="profile-input-container">
        <label>Email</label>

        <div class="profile-input-section">
          <input
            type="text"
            class="profile-input"
            v-model="profileInfos.email"
          />
          <p ref="emailError" class="input-error">Input error</p>
        </div>
        <span></span>
      </div>
      <div class="profile-input-container">
        <label>Picture</label>
        <div class="profile-input-section">
          <input
            type="file"
            class="profile-file-input"
            id="profile-picture"
            accept="image/png,image/jpeg"
            @change="newProfilePicture"
            ref="profilePicture"
          />
          <label for="profile-picture" ref="pictureLabel"
            >profile picture (Max 10Mb)</label
          >
          <p ref="pictureError" class="input-error">Input error</p>
        </div>
      </div>
      <div class="profile-input-container">
        <label>Password</label>
        <div class="profile-input-section">
          <input
            type="password"
            class="profile-input"
            v-model="profileInfos.password"
          />
          <p ref="passwordError" class="input-error">Input error</p>
        </div>
      </div>
      <div class="profile-input-container">
        <label>New Password</label>
        <div class="profile-input-section">
          <input
            type="password"
            class="profile-input"
            v-model="profileInfos.newPassword"
          />
          <p ref="newPasswordError" class="input-error">Input error</p>
        </div>
      </div>
      <div class="profile-input-container">
        <label>Confirm Password</label>
        <div class="profile-input-section">
          <input
            type="password"
            class="profile-input"
            v-model="profileInfos.newPasswordConf"
          />
          <p ref="newPasswordConfError" class="input-error"></p>
        </div>
      </div>
      <button
        class="btn profile-btn py-sm radius-lg"
        :class="!isFormValid ? 'btn-disabled' : ''"
        @click="clicked()"
        :disabled="!isFormValid"
      >
        <span v-if="!profileLoading">Save Changes</span>
        <i v-else class="fas fa-spinner fa-pulse"></i>
      </button>
    </div>
  </section>
</template>


<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Profile",
  components: {
    AppAlert: () => import("@/components/AppAlert"),
  },
  data: function () {
    return {
      formValidation: {
        fullName: null,
        email: null,
        picture: null,
        password: null,
        newPassword: null,
        newPasswordConf: null,
      },
      profileInfos: {
        fullName: null,
        email: null,
        picture: null,
        password: null,
        newPassword: null,
        newPasswordConf: null,
      },
    };
  },
  methods: {
    ...mapActions("profile", ["updateProfileInfos"]),
    ...mapMutations("profile", ["resetError"]),
    clicked() {
      this.updateProfileInfos(this.profileInfos);
    },
    newProfilePicture(event) {
      this.profileInfos.picture = event.target.files[0];
    },
  },

  mounted() {
    this.profileInfos.fullName = this.currentUser.fullName;
    this.profileInfos.email = this.currentUser.email;
  },

  computed: {
    ...mapGetters("auth", ["currentUser"]),
    ...mapGetters("profile", ["profileLoading", "profileError"]),
    isFormValid() {
      if (
        this.formValidation.fullName &&
        this.formValidation.email &&
        this.formValidation.password &&
        this.formValidation.newPasswordConf != false &&
        this.formValidation.newPassword != false &&
        this.formValidation.picture != false
      ) {
        return true;
      }
      return false;
    },
  },
  watch: {
    "profileInfos.fullName"() {
      let fullNameError = this.$refs.fullNameError;
      if (
        /^[A-Za-z]*( [A-Za-z]([-']?[a-z]{1,2})*)+$/.test(
          this.profileInfos.fullName
        )
      ) {
        this.formValidation.fullName = true;
        fullNameError.style.display = "none";
      } else {
        this.formValidation.fullName = false;
        fullNameError.innerHTML =
          "Full name must consist of First Name and Last Name";
        fullNameError.style.display = "block";
      }
    },
    "profileInfos.email"() {
      let emailError = this.$refs.emailError;
      if (
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/.test(
          this.profileInfos.email
        )
      ) {
        emailError.style.display = "none";
        this.formValidation.email = true;
      } else {
        this.formValidation.email = false;
        emailError.innerHTML = "invalid Email";
        emailError.style.display = "block";
      }
    },
    "profileInfos.newPassword"() {
      let passwordError = this.$refs.newPasswordError;
      if (
        /^(?=.*[0-9])(?=.*[a-z0-9])(?=.*[A-Z0-9])([a-zA-Z0-9]{6,})$/.test(
          this.profileInfos.newPassword
        )
      ) {
        passwordError.style.display = "none";
        this.formValidation.newPassword = true;
        if (
          this.profileInfos.newPassword != this.profileInfos.newPasswordConf
        ) {
          this.formValidation.newPasswordConf = false;
        } else {
          let passwordConfError = this.$refs.newPasswordConfError;
          passwordConfError.style.display = "none";
          this.formValidation.newPasswordConf = true;
        }
      } else {
        passwordError.innerHTML =
          "Password must be 6 characters and contain at least one Number";
        this.formValidation.newPassword = false;
        passwordError.style.display = "block";
      }
    },
    "profileInfos.newPasswordConf"() {
      let passwordConfError = this.$refs.newPasswordConfError;
      if (this.profileInfos.newPassword === this.profileInfos.newPasswordConf) {
        passwordConfError.style.display = "none";
        this.formValidation.newPasswordConf = true;
      } else {
        passwordConfError.style.display = "block";
        passwordConfError.innerHTML = `Passwords don't match! 🤨 `;
        this.formValidation.newPasswordConf = false;
      }
    },
    "profileInfos.password"() {
      if (this.profileInfos.password) {
        this.formValidation.password = true;
      } else {
        this.formValidation.password = false;
      }
    },
    "profileInfos.picture"() {
      let pictureLabel = this.$refs.pictureLabel;
      let pictureError = this.$refs.pictureError;
      if (this.profileInfos.picture.size / 1048576 < 10) {
        pictureLabel.innerHTML = this.profileInfos.picture.name;
        pictureError.style.display = "none";
        this.formValidation.picture = true;
      } else {
        pictureLabel.innerHTML = "profile picture (Max 10Mb)";
        pictureError.innerHTML = "Picture size over 10Mb!";
        pictureError.style.display = "block";
        this.profileInfos.picture = null;
      }
    },
    "profileError.message"(val) {
      if (val) {
        setTimeout(() => {
          this.resetError();
        }, 4000);
      }
    },
  },
};
</script>


<style >
@import url("../assets/css/Profile.css");
</style>

