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
    <router-link v-else class="logout" to="/">
      <div class="btn">
        <span>Log-Out</span>
        <i class="icon fa"></i>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isAuth: true,
    };
  },
};
</script>

<style>
</style>