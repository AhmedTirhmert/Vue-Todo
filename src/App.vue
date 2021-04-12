<template>
  <div id="app"><main-layout /></div>
</template>
<script>
export default {
  components: {
    MainLayout: () => import("./Layout/mainLayout"),
  },
};
</script>
