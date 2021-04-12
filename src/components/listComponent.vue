<template>
  <div class="listBox radius-xs">
    <h2 class="radius-sm listTitle px-md">{{ listTitle }}</h2>
    <section class="todosSection">
      <div v-for="(todo, key) in Todos" :key="key" class="todosItem radius-sm">
        <!-- <p>{{ todo.content }}</p> -->
        <textarea
          class="todoInput"
          rows="1"
          type="text"
          v-model.lazy="todo.content"
        />
        <!-- <span>{{ todo.created_at | carbonJs() }}</span> -->
      </div>
    </section>
  </div>
</template>

<script>
import Filters from "../Mixins/Filters";
export default {
  mixins: [Filters],
  name: "List",
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
@import url("../Style/Variables.css");

.todoInput {
  border: none;
  padding: 0.7em 1em 0.5em 0.7em;
  width: 100%;
  overflow: hidden;
  resize: none;
  border-radius: 0.5rem;
  font-family: var(--ubuntu);
  font-size: 01rem;
  outline: none;
  background-color: var(--cardBg);
  display: block;
}
.todoInput:focus {
  color: var(--primaryColor);
  filter: drop-shadow(0px 1px 12px rgba(0, 0, 0, 0.07));
}
.todosSection {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}
.todosSection .todosItem {
  display: flex;
  background-color: var(--cardBg);
  padding: 0;
}
.listBox {
  position: relative;
  margin-bottom: 3em;
}
@media screen and (min-width: 481px) and (max-width: 768px) {
  .todoInput {
    font-size: 1.1rem;
  }
}
</style>