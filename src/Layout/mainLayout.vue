<template>
  <div class="mainLayout">
    <app-header />
    <main class="mainContent">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  components: {
    appHeader: () => import("../components/Header"),
  },
};
</script>

<style>
</style>