<!-- @format -->

<template>
  <div class="lists-box radius-xs">
    <h2 class="radius-sm color_heading_2">Latest Todos</h2>
    <section class="todos-section">
      <div v-if="Todos.length > 0">
        <todo
          v-for="(todo, key) in Todos"
          :key="key"
          :todo="todo"
          @deleteTodoById="deleteTodoById"
          :Editable="false"
        />
      </div>
      <div v-else class="no-todos">No Todos Yet</div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Todos",
  components: {
    todo: () => import("@/components/Todo"),
  },
  props: {
    Todos: {
      type: Array,
      required: true,
    },
  },
  methods: {
    todoClicked(listId) {
      this.$emit("todoClicked", listId);
    },
    deleteTodoById(value) {
      this.$emit("deleteTodoById", value);
    },
  },
};
</script>

<style scoped>
@import url("../assets/css/Todos.css");
</style>
