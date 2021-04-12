<template>
  <div class="listsBox radius-xs">
    <h2 class="radius-sm">Todos</h2>
    <section class="todosSection">
      <div
        v-for="(todo, key) in Todos"
        :key="key"
        class="todosItem radius-sm"
        @click="$emit('TodoClicked', todo.list_id)"
      >
        <p>{{ todo.content }}</p>
        <span class="text--italic text--end mt-sm">{{
          todo.created_at | carbonJs()
        }}</span>
      </div>
    </section>
  </div>
</template>
   
<script>
import filters from "../Mixins/Filters";
export default {
  name: "Todos",
  mixins: [filters],
  props: {
    Todos: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>