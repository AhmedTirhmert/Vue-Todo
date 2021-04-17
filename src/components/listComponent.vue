<template>
  <div class="listBox radius-xs">
    <h2 class="radius-sm listTitle px-md">{{ listTitle }}</h2>
    <section class="todosSection">
      <todo
        v-for="(todo, key) in Todos"
        :key="key"
        :todoKey="key"
        :todo="todo"
        :Editable="true"
      />
    </section>
  </div>
</template>

<script>
export default {
  name: "List",
  components: {
    Todo: () => import("../components/Todo"),
  },
  props: {
    listTitle: {
      type: String,
      required: true,
    },
    Todos: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>