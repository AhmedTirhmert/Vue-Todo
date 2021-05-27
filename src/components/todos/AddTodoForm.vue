<!-- @format -->

<template>
  <div class="new-todo-section radius-sm">
    <span
      class="text_gray_2 text_italic text_center mb-md"
      :class="newTodo.loading ? 'loading' : ''"
      @click="toggleAddTodoForm"
      >Click to add new Todos...</span
    >
    <div class="new-todo-loading" v-if="newTodo.loading">
      <i class="fas fa-spinner fa-pulse"></i>
    </div>
    <div
      class="new-todo"
      v-show="newTodo.visible"
      :class="newTodo.loading ? 'loading' : ''"
    >
      <div>
        <textarea
          class="new-todo-input"
          type="text"
          ref="newTodoInput"
          v-model="newTodo.content"
          @input="autoGrowInput()"
          @keydown.esc="hideTodoAddForm"
          @keyup.ctrl.enter="addTodo()"
          placeholder="New Todo..."
          autofocus
        />
        <p class="new-todo-input-error mx-sm" v-show="newTodo.error.message">
          {{ newTodo.error.message }},
          <b v-show="newTodo.error.todoId" @click="undoneTodo">Undone it!</b>
        </p>
      </div>
      <button class="btn radius-lg add-todo-btn" @click="addTodo()">
        <i class="fa"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddTodoForm",
  props: {
    listId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newTodo: {
        visible: false,
        content: null,
        loading: false,
        error: {
          message: null,
          todoId: null,
        },
      },
    };
  },
  mounted() {},
  methods: {
    ...mapActions("todos", ["addNewTodo", "undoneTodoById"]),
    toggleAddTodoForm() {
      if (this.newTodo.visible) {
        this.hideTodoAddForm();
      } else {
        this.showAddTodoForm();
      }
    },
    showAddTodoForm() {
      this.newTodo.visible = true;
      this.$nextTick(() => {
        this.$refs.newTodoInput.focus();
      });
    },
    hideTodoAddForm() {
      this.newTodo.visible = false;
      this.newTodo.error.message = null;
      this.newTodo.content = null;
    },
    autoGrowInput() {
      if (this.newTodo.visible) {
        this.$refs.newTodoInput.style.height = "inherit";
        let textArea = this.$refs.newTodoInput;
        let Computed = window.getComputedStyle(textArea);
        let height =
          parseFloat(Computed.paddingTop, 10) +
          parseFloat(Computed.paddingBottom, 10) +
          textArea.scrollHeight;
        textArea.style.height = `${height - 28}px`;
      }
    },
    async addTodo() {
      if (this.newTodo.content && this.newTodo.content.trim().length > 0) {
        try {
          this.newTodo.loading = true;
          await this.addNewTodo({
            listId: this.listId,
            content: this.newTodo.content.trim(),
          });
          this.newTodo.content = null;
          this.newTodo.loading = false;
          this.newTodo.error.message = null;
        } catch (error) {
          this.newTodo.loading = false;
          this.newTodo.error.message = error.message;
          this.newTodo.error.todoId = error.todoId;
          this.$refs.newTodoInput.focus();
        }
      }
    },
    async undoneTodo() {
      try {
        this.newTodo.loading = true;
        await this.undoneTodoById({ todoId: this.newTodo.error.todoId });
        this.newTodo.loading = false;
        this.newTodo.error.message = null;
        this.newTodo.content = null;
      } catch (error) {
        this.newTodo.loading = false;
        this.newTodo.error.message = null;
        this.newTodo.content = null;
      }
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/components/todos/add-todo-form.css");
</style>
