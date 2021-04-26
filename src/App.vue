<template>
  <div id="app"><main-layout /></div>
</template>
<script>
export default {
  components: {
    MainLayout: () => import("@/layouts/Main"),
  },
  methods: {},
};
</script>
<style scoped>
@import url("assets/css/index.css");
</style>
