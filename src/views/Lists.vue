<template>
  <section>
    <h2 class="color--heading1 mb-md">Lists</h2>
    <user-lists
      :Heading="false"
      :viewMore="false"
      :Lists="userLists"
      :Actions="true"
    />
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    userLists: () => import("@/components/Lists"),
  },
  mounted() {
    this.getUserLists();
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("lists", ["getUserLists"]),
  },
  computed: {
    ...mapGetters("lists", ["userLists"]),
  },
};
</script>

<style>
@import url("../assets/css/Views/Lists.css");
</style>