<template>
  <div class="listBox radius-xs">
    <h2 class="radius-sm listTitle px-md">{{ listTitle }}</h2>
    <section class="todosSection">
      <div class="listTodoContainer" v-for="(todo, key) in Todos" :key="key">
        <div class="listTodoContent">
          <div class="listTodosItem radius-sm">
            <textarea
              class="todoInput"
              rows="1"
              type="text"
              v-model.lazy="todo.content"
              :ref="`autoGrowInput${key}`"
              @input="inputing(`autoGrowInput${key}`)"
            />
            <span
              class="listTodoDate px-sm text--end text--gray2 text--italic"
              >{{ todo.created_at | carbonJs() }}</span
            >
          </div>
        </div>
        <div class="todoActions">
          <button class="btn radius-sm listTodoDone">
            <i class="fa"></i>
          </button>
          <button class="btn radius-sm listDeleteTodo">
            <i class="fa"></i>
          </button>
        </div>
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
  methods: {
    inputing(ta) {
      this.$refs[ta][0].style.height = "inherit";
      let TA = this.$refs[ta][0];
      let Computed = window.getComputedStyle(TA);
      let height =
        parseFloat(Computed.paddingTop, 10) +
        parseFloat(Computed.paddingBottom, 10) +
        TA.scrollHeight;
      console.log("Scroll Height => ", TA.scrollHeight);
      console.log(height);
      TA.style.height = `${height - 20}px`;
      console.log("TA height => ", TA.style.height);
    },
  },
  mounted() {
    for (const key in this.Todos) {
      this.inputing(`autoGrowInput${key}`);
      console.log(key);
    }
  },
};
</script>

<style>
@import url("../Style/Variables.css");

.todoInput {
  border: none;
  padding: 0.7em 1em 0.7em 0.7em;
  width: 100%;
  overflow: hidden;
  resize: none;
  border-radius: 0.5rem;
  font-family: var(--ubuntu);
  font-size: 01rem;
  outline: none;
  background-color: var(--cardBg);
  display: block;
  height: fit-content;
}
.todoInput:focus {
  color: var(--primaryColor);
  filter: drop-shadow(0px 1px 12px rgba(0, 0, 0, 0.1));
}
.listTodosItem {
  display: flex;
  flex-direction: column;
}
.todosSection {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}
.todosSection .listTodosItem {
  display: flex;
  background-color: var(--cardBg);
  padding: 0;
}
.listTodoDate {
  font-size: 0.7em;
}
.listBox {
  position: relative;
  margin-bottom: 3em;
}
.listTodoContainer {
  display: grid;
  grid-template-columns: 10fr 2fr;
}
.todoActions {
  display: flex;
  justify-content: space-around;
}
.todoActions .btn {
  margin: auto auto;
  padding: 0.5em;
  background-color: var(--cardBg);
  outline: none;
  font-size: 1em;
}
.todoActions .btn:hover {
  filter: drop-shadow(0px 1px 12px rgba(0, 0, 0, 0.2));
}
.listTodoDone > i::before {
  font-family: "Font Awesome 5 Free";
  content: "\f00c";
  color: var(--success);
}
.listDeleteTodo > i::before {
  font-family: "Font Awesome 5 Free";
  content: "\f1f8";
  color: var(--danger);
}

@media screen and (min-width: 481px) and (max-width: 768px) {
  .todoInput {
    font-size: 1.1rem;
  }
}
</style>