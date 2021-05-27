<!-- @format -->

<template>
  <div class="todo-containner mb-md">
    <div class="todo-content">
      <div class="todos-item radius-sm">
        <textarea
          class="todo-input"
          rows="1"
          type="text"
          v-model.lazy="todo.content"
          :ref="`autoGrowInput${todo.todoId}`"
          @input="autoResizeTextArea()"
          @change="chanegingTheTodo"
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
        @click="$emit('deleteTodoById', todo.todoId)"
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
  },
  methods: {
    ...mapActions("todos", ["editTodoById", "deleteTodoById", "todoDoneById"]),
    autoResizeTextArea() {
      if (this.$refs[`autoGrowInput${this.todo.todoId}`]) {
        this.$refs[`autoGrowInput${this.todo.todoId}`].style.height = "inherit";
        let TA = this.$refs[`autoGrowInput${this.todo.todoId}`];
        let Computed = window.getComputedStyle(TA);
        let height =
          parseFloat(Computed.paddingTop, 10) +
          parseFloat(Computed.paddingBottom, 10) +
          TA.scrollHeight;
        TA.style.height = `${height - 20}px`;
      }
    },
    async markTodoDone() {
      await this.todoDoneById({ todoId: this.todo.todoId });
    },
    chanegingTheTodo() {
      this.editTodoById({
        todoId: this.todo.todoId,
        content: this.todo.content,
      });
      this.autoResizeTextArea();
    },
  },
  mounted() {
    this.autoResizeTextArea();
  },
  watch: {
    "todo.content"() {
      this.autoResizeTextArea();
    },
  },
};
</script>
