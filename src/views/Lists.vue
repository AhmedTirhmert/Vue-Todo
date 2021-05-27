<!-- @format -->

<template>
  <section>
    <h2 class="color_heading_1 mb-md">Lists</h2>
    <user-lists
      :Heading="false"
      :viewMore="false"
      :lists="userLists"
      :actions="true"
    />
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    userLists: () => import("@/components/Lists"),
  },
  computed: {
    ...mapGetters("lists", ["userLists"]),
  },
  methods: {
    ...mapActions("lists", ["getUserLists", "killListsListener", "resetLists"]),
  },
  mounted() {
    this.getUserLists();
  },
  destroyed() {
    this.killListsListener();
    this.resetLists();
  },
};
</script>

<style scoped>
@import url("../assets/css/Views/Lists.css");
</style>
