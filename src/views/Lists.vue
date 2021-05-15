<template>
  <section>
    <h2 class="color_heading_1 mb-md">Lists</h2>
    <user-lists
      :Heading="false"
      :viewMore="false"
      :Lists="userLists"
      :Actions="true"
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    userLists: () => import("@/components/Lists"),
  },
  computed: {
    ...mapGetters("lists", ["userLists"]),
  },
};
</script>

<style scoped>
@import url("../assets/css/Views/Lists.css");
</style>