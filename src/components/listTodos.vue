<template>
  <div class="listBox radius-xs">
    <div class="listTitle">
      <h2 class="radius-sm px-lg py-xs color--heading2">{{ listTitle }}</h2>
    </div>

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
  name: "listTodos",
  components: {
    Todo: () => import("@/components/Todo"),
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