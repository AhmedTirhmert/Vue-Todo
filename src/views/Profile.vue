<!-- @format -->

<template>
  <section>
    <h2 class="color_heading_1 mb-md">Profile</h2>
    <form
      class="profile-section radius-sm py-md px-lg"
      @submit.prevent="submitChnages"
      @reset.prevent="deleteAccount"
    >
      <app-alert
        :autoDisappear="true"
        :message="submitInfo.error.message"
        :type="submitInfo.error.type"
        :delay="5"
      />
      <div class="profile-input-container">
        <label>Full Name</label>
        <div class="profile-input-section">
          <input
            type="text"
            class="profile-input"
            v-model="profileInfos.fullName"
            @input="fullNameValidation"
          />
          <p v-if="fullNameValidation" class="input-error">
            {{ fullNameValidation() }}
          </p>
        </div>
      </div>
      <div class="profile-input-container">
        <label>Email</label>

        <div class="profile-input-section">
          <input
            type="text"
            class="profile-input"
            v-model="profileInfos.email"
            @input="emailValidation"
          />
          <p v-if="emailValidation" class="input-error">
            {{ emailValidation() }}
          </p>
        </div>
      </div>
      <div class="profile-input-container">
        <label>Picture</label>
        <div class="profile-input-section">
          <input
            type="file"
            class="profile-file-input"
            id="profile-picture"
            accept="image/png,image/jpeg"
            @input="pictureValidation"
            ref="profilePicture"
          />
          <label for="profile-picture" ref="pictureLabel"
            >profile picture (Max 10Mb)</label
          >
          <p v-if="pictureError" class="input-error">
            {{ pictureError() }}
          </p>
        </div>
      </div>
      <div class="profile-input-container">
        <label>Password</label>
        <div class="profile-input-section">
          <input
            type="password"
            class="profile-input"
            v-model="profileInfos.password"
            @input="passwordValidation"
          />
          <p v-if="passwordValidation" class="input-error">
            {{ passwordValidation() }}
          </p>
        </div>
      </div>
      <div class="profile-input-container">
        <label>New Password</label>
        <div class="profile-input-section">
          <input
            type="password"
            class="profile-input"
            v-model="profileInfos.newPassword"
            @input="newPasswordValidation"
          />
          <p v-if="newPasswordValidation" class="input-error">
            {{ newPasswordValidation() }}
          </p>
        </div>
      </div>
      <div class="profile-input-container">
        <label>Confirm Password</label>
        <div class="profile-input-section">
          <input
            type="password"
            class="profile-input"
            v-model="profileInfos.newPasswordConf"
            @input="newPasswordConfValidation"
          />
          <p
            v-if="newPasswordConfValidation"
            ref="newPasswordConfError"
            class="input-error"
          >
            {{ newPasswordConfValidation() }}
          </p>
        </div>
      </div>
      <button
        class="btn profile-btn py-sm radius-lg"
        :class="submitInfo.loading ? 'btn-disabled' : ''"
        type="submit"
        :disabled="submitInfo.loading"
      >
        <span v-if="!submitInfo.loading">Save Changes</span>
        <i v-else class="fas fa-spinner fa-pulse"></i>
      </button>
      <div class="delete-account">
        <button type="reset">Delete Account!</button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import methods from "@/mixins/methods";
export default {
  name: "Profile",
  mixins: [methods],
  components: {
    AppAlert: () => import("@/components/AppAlert"),
  },
  data: function () {
    return {
      submitInfo: {
        loading: false,
        error: {
          message: null,
          type: "danger",
        },
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
    deleteAccount() {
      console.log("DELETING ACCOUNT");
    },
    async submitChnages() {
      try {
        this.submitInfo.loading = true;
        this.submitInfo.error.message = null;
        await this.updateProfileInfos({
          fullName: this.profileInfos.fullName,
          email: this.profileInfos.email,
          profilePicture: this.profileInfos.picture,
          currentPassword: this.profileInfos.password,
          newPassword: this.profileInfos.newPassword,
        });
        this.submitInfo.loading = false;
        this.submitInfo.error.message = "Changes Saved Successfully 👍";
        this.submitInfo.error.type = "success";
      } catch (error) {
        this.submitInfo.error.type = "danger";
        this.submitInfo.loading = false;
        this.submitInfo.error.message = error.message;
      }
    },
    fullNameValidation() {
      if (
        /^[A-Za-z0-9]*( [A-Za-z0-9]([-']?[A-Za-z0-9]{1,2})*)+$/.test(
          this.profileInfos.fullName
        )
      ) {
        return null;
      } else {
        return "Full name must consist of First Name and Last Name";
      }
    },
    emailValidation() {
      if (
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/.test(
          this.profileInfos.email
        )
      ) {
        return null;
      } else {
        return "invalid Email";
      }
    },
    pictureValidation(event) {
      if (event) {
        this.profileInfos.picture = event.target.files[0];
      }
    },
    pictureError() {
      let pictureLabel = this.$refs.pictureLabel;
      if (
        this.profileInfos.picture &&
        this.profileInfos.picture.size / 1048576 < 10
      ) {
        pictureLabel.innerHTML = this.profileInfos.picture.name;
        return null;
      } else if (this.profileInfos.picture === null) {
        return null;
      } else {
        if (pictureLabel) {
          pictureLabel.innerHTML = "profile picture (Max 10Mb)";
        }
        return "Picture size over 10Mb!";
      }
    },
    passwordValidation() {
      return null;
    },
    newPasswordValidation() {
      if (
        !this.profileInfos.newPassword ||
        /^(?=.*[0-9])(?=.*[a-z0-9])(?=.*[A-Z0-9])([a-zA-Z0-9]{6,})$/.test(
          this.profileInfos.newPassword
        )
      ) {
        return null;
      } else {
        return "Password must be 6 characters and contain at least one Number";
      }
    },
    newPasswordConfValidation() {
      if (this.profileInfos.newPassword === this.profileInfos.newPasswordConf) {
        return null;
      } else {
        return `Passwords don't match! 🤨 `;
      }
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
        this.fullNameValidation() == null &&
        this.emailValidation() == null &&
        this.pictureValidation() == null &&
        this.newPasswordValidation() == null &&
        this.newPasswordConfValidation() == null
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
@import url("../assets/css/Profile.css");
</style>
