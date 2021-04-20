<template>
  <div id="app"><main-layout /></div>
</template>
<script>
export default {
  components: {
    MainLayout: () => import("./Layout/Main"),
  },
};
</script>
<style scoped>
@import url("Style/index.css");
</style>
