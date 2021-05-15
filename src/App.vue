<template>
  <div id="app"><main-layout /></div>
</template>
<script>
export default {
  components: {
    MainLayout: () => import("@/layouts/Main"),
  },
};
</script>
<style >
@import url("assets/css/index.css");
</style>
