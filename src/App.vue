<template>
  <div id="app"><main-layout /></div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    MainLayout: () => import("@/layouts/Main"),
  },
  beforeMount() {},
  methods: {
    ...mapActions("lists", ["getUserLists"]),
  },
  computed: {
    ...mapGetters("auth", ["isAuth"]),
  },
};
</script>
<style scoped>
@import url("assets/css/index.css");
</style>
