<template>
  <section class="list">
    <list-todos
      :listTitle="getListById($route.params.listId).title"
      :Todos="todos"
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "list",
  components: {
    ListTodos: () => import("@/components/ListTodos"),
  },
  data() {
    return {
      todos: {},
    };
  },
  computed: {
    ...mapGetters("lists", ["getListById"]),
  },
};
</script>

<style>
@import url("../assets/css/list-view.css");
</style>