<template>
  <div class="mainLayout">
    <app-header :isOpen="isOpen" @toggle-dd="isOpen = !isOpen" />
    <main class="mainContent" @click="toggleIt">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  components: {
    AppHeader: () => import("../components/AppHeader"),
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleIt() {
      this.isOpen = false;
    },
  },
};
</script>

<style>
</style>