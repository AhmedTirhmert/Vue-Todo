<template>
  <div class="todo-containner mb-md">
    <div class="todo-content">
      <div class="todos-item radius-sm">
        <textarea
          class="todoInput"
          rows="1"
          type="text"
          v-model.lazy="todo.content"
          :ref="`autoGrowInput${todoKey}`"
          @input="inputing()"
        />
        <span class="todo-date px-sm text--end text--gray2 text--italic">{{
          todo.createdAt | carbonJs()
        }}</span>
      </div>
    </div>
    <div class="todo-actions">
      <button class="btn radius-lg todo-done" @click="markTodoDone()">
        <i class="fa"></i>
      </button>
      <button
        class="btn radius-lg todo-delete"
        @click="$emit('deleteTodoById', todoKey)"
      >
        <i class="fa"></i>
      </button>
    </div>
  </div>
</template>

<script>
import filters from "@/mixins/filters";
import { mapActions } from "vuex";

export default {
  mixins: [filters],
  components: {},
  name: "Todo",
  props: {
    todo: {},
    todoKey: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions("todos", ["editTodoById", "deleteTodoById", "todoDoneById"]),
    inputing() {
      if (this.$refs[`autoGrowInput${this.todoKey}`]) {
        this.$refs[`autoGrowInput${this.todoKey}`].style.height = "inherit";
        let TA = this.$refs[`autoGrowInput${this.todoKey}`];
        let Computed = window.getComputedStyle(TA);
        let height =
          parseFloat(Computed.paddingTop, 10) +
          parseFloat(Computed.paddingBottom, 10) +
          TA.scrollHeight;
        TA.style.height = `${height - 20}px`;
      }
    },
    markTodoDone() {
      this.todoDoneById(this.todoKey);
    },
  },
  mounted() {
    this.inputing();
  },
  watch: {
    "todo.content"(newContent) {
      this.editTodoById({
        todoId: this.todo.todoId,
        todoContent: newContent,
      });
      this.inputing();
    },
  },
};
</script>

<style>
</style>