<template>
  <div class="header" :class="isAuth ? '' : 'flex-center'">
    <!-- <div class="logo"></div> -->
    <router-link class="logo" to="/"> Todo-App </router-link>
    <div v-if="isAuth" class="userDropdown">
      <button
        href="#"
        class="avatarBtn radius-lg mx-lg"
        @click="$emit('toggle-dd', isOpen)"
      >
        <img
          src="../assets/avatar.png"
          alt="avatar"
          class="avatarImg radius-lg"
        />
      </button>
      <ul v-if="isOpen" class="radius-sm">
        <li class="radius-sm">
          <router-link
            class="py-md px-lg dd-link radius-sm flex justify-space-between"
            to="/profile"
          >
            <span>Profile</span><i class="text--gray3 fas fa-user"></i>
          </router-link>
        </li>
        <li class="radius-sm">
          <button
            @click="logoutUser"
            class="py-md px-lg dd-link radius-sm flex justify-space-between"
          >
            <span>Sign out</span><i class="text--gray3 fas fa-sign-out-alt"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AppHeader",
  props: {
    isOpen: {
      value: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("AuthStore", ["logoutUser"]),
    Logout() {
      console.log("Logging Out");
    },
  },
  computed: {
    ...mapGetters("AuthStore", ["isAuth"]),
  },
};
</script>

<style>
</style>