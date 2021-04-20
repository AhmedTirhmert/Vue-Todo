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
          <router-link
            class="py-md px-lg dd-link radius-sm flex justify-space-between"
            to="/login"
          >
            <span>Sign out</span><i class="text--gray3 fas fa-sign-out-alt"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    isOpen: {
      value: false,
    },
  },
  data() {
    return {
      isAuth: true,
    };
  },
  methods: {
    Logout() {
      console.log("Logging Out");
    },
  },
};
</script>

<style>
</style>