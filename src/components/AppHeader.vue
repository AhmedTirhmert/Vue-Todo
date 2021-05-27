<!-- @format -->

<template>
  <div class="header" :class="isAuth ? '' : 'flex-center'">
    <!-- <div class="logo"></div> -->
    <router-link class="logo" to="/"> Todo-App </router-link>
    <div v-if="isAuth" class="user-dropdown">
      <button
        href="#"
        class="avatar-btn radius-lg mx-lg"
        @click.prevent="$emit('toggleDropDown', toggleDropDown)"
      >
        <img
          :src="currentUser.picture"
          alt="avatar"
          class="avatar-img radius-lg"
        />
      </button>
      <ul v-if="toggleDropDown" class="radius-sm">
        <li>
          <div class="py-md px-lg dd-user-name">{{ currentUser.fullName }}</div>
        </li>
        <li class="radius-sm" @click="$emit('toggleDropDown', toggleDropDown)">
          <router-link
            class="py-md px-lg dd-link radius-sm flex justify-space-between"
            :to="{ name: 'Profile' }"
          >
            <span>Profile</span><i class="text_gray_3 fas fa-user"></i>
          </router-link>
        </li>
        <li class="radius-sm" @click="$emit('toggleDropDown', toggleDropDown)">
          <button
            @click="logoutUser"
            class="py-md px-lg dd-link radius-sm flex justify-space-between"
          >
            <span>Sign out</span><i class="text_gray_3 fas fa-sign-out-alt"></i>
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
    toggleDropDown: {
      default: false,
    },
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
  },
  computed: {
    ...mapGetters("auth", ["isAuth", "currentUser"]),
  },
};
</script>

<style scoped>
@import url("../assets/css/app-header.css");
</style>
