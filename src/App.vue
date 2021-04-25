<template>
  <div id="app"><main-layout /></div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  components: {
    MainLayout: () => import("./Layout/Main"),
  },
  methods: {
    ...mapActions("AuthStore", ["HandleAuthStateChange"]),
  },
  beforeMount() {
    this.HandleAuthStateChange();
  },
};
</script>
<style scoped>
@import url("Style/index.css");
</style>
