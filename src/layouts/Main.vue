<template>
  <div class="main-layout">
    <app-header
      :toggleDropDown="toggleDropDown"
      @toggleDropDown="toggleDropDown = !toggleDropDown"
    />
    <main class="main-content" @click="toggleDropDown = false">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  components: {
    AppHeader: () => import("@/components/AppHeader"),
  },
  data() {
    return {
      toggleDropDown: false,
    };
  },
};
</script>
