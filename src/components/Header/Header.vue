<template>
  <div class="header">
    <!-- <div class="logo"></div> -->
    <router-link class="logo" to="/"> Todo-App </router-link>
    <router-link v-if="isAuth" class="login" to="/">
      <div class="btn">
        <span>Log-In</span>

        <i class="icon fa"></i>
      </div>
    </router-link>
    <div v-else class="userDropdown">
      <button
        href="#"
        class="avatarBtn radius-lg mx-lg"
        @click="$emit('toggle-dd', isOpen)"
      >
        <img
          src="../../assets/avatar.png"
          alt="avatar"
          class="avatarImg radius-lg"
        />
      </button>
      <ul v-if="isOpen" class="radius-sm">
        <li class="radius-sm">
          <router-link class="py-md px-lg dd-link radius-sm" to="/ptofile">
            Profile
          </router-link>
        </li>
        <li class="radius-sm">
          <router-link class="py-md px-lg dd-link radius-sm" to="/signOut">
            SignOut
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
      isAuth: false,
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