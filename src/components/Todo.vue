<template>
  <div class="todo-containner mb-md">
    <div class="todo-content">
      <div class="todos-item radius-sm">
        <textarea
          class="todo-input"
          rows="1"
          type="text"
          v-model.lazy="todo.content"
          :ref="`autoGrowInput${todoKey}`"
          @input="resizeTextArea()"
        />
        <span class="todo-date px-sm text_end text_gray_2 text_italic">{{
          todo.createdAt | fromNow()
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
    resizeTextArea() {
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
    this.resizeTextArea();
  },
  watch: {
    "todo.content"(newContent) {
      this.editTodoById({
        todoId: this.todo.todoId,
        todoContent: newContent,
      });
      this.resizeTextArea();
    },
  },
};
</script>