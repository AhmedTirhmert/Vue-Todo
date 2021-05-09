<template>
  <div class="listsBox radius-xs">
    <h2 class="radius-sm color--heading2">Latest Todos</h2>
    <section class="todosSection">
      <div v-if="Object.keys(Todos).length > 0">
        <todo
          v-for="(todo, key) in Todos"
          :key="todo.id"
          :todo="todo"
          :todoKey="key"
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
      type: Object,
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
.no-todos {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20vh;
  font-size: 2.3rem;
  font-family: var(--ubuntu);
  font-weight: 400;
  font-style: italic;
  color: var(--gray2);
}
</style>