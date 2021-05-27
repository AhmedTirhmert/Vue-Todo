<!-- @format -->

<template>
  <div id="app"><main-layout /></div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    MainLayout: () => import("@/layouts/Main"),
  },
  methods: {
    ...mapActions("todos", ["getUserRecentTodos"]),
  },
  mounted() {},
  computed: {
    ...mapGetters("auth", ["isAuth"]),
  },
};
</script>
<style>
@import url("assets/css/index.css");
</style>
