<template>
  <div id="app"><main-layout /></div>
</template>
<script>
export default {
  components: {
    MainLayout: () => import("./layout/Main"),
  },
  methods: {},
};
</script>
<style scoped>
@import url("style/index.css");
</style>
