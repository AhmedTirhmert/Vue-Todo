<template>
  <div class="listsBox radius-xs">
    <h2 class="radius-sm color--heading2">Latest Todos</h2>
    <section class="todosSection">
      <todo
        v-for="(todo, key) in Todos"
        :key="todo.id"
        :Todo="todo"
        @TodoClicked="todoClicked"
        :todoKey="key"
        :Editable="false"
      />
    </section>
  </div>
</template>
   
<script>
export default {
  name: "Todos",
  components: {
    todo: () => import("../components/Todo"),
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
  },
};
</script>

<style>
</style>