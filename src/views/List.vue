<!-- @format -->

<template>
  <section class="list">
    <list-todos
      :listId="$route.params.listId"
      @deleteTodoById="showDeleteTodoModal"
    />
    <delete-modal
      ref="todoDeleteModal"
      :success="todoDelete.success"
      :loading="todoDelete.loading"
      @modalBackdropClose="closeDeleteTodoModal()"
      @closeModal="closeDeleteTodoModal()"
    >
      <template v-slot:header><h1>Delete List</h1> </template>
      <template v-slot:sub-header>
        You sure you wanna delete
        <br /><b class="color_danger"
          ><q>{{ todoDelete.content }}</q></b
        ></template
      >
      <template v-slot:footer>
        <button class="cancel" @click="closeDeleteTodoModal()">Cancel</button>
        <button class="accept" @click="deleteTodo()">Yes</button>
      </template>
    </delete-modal>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "list",
  components: {
    ListTodos: () => import("@/components/ListTodos"),
    DeleteModal: () => import("@/components/DeleteModal"),
  },
  destroyed() {
    this.resetListTodos();
    this.killListTodosListener();
  },
  data() {
    return {
      todoDelete: {
        content: null,
        todoId: null,
        loading: false,
        success: false,
      },
    };
  },
  computed: {
    ...mapGetters("todos", ["getListTodoById"]),
  },
  methods: {
    ...mapActions("todos", [
      "deleteTodoById",
      "resetListTodos",
      "killListTodosListener",
    ]),
    showDeleteTodoModal(todoId) {
      this.todoDelete.content = this.getListTodoById(todoId).content;
      this.todoDelete.todoId = todoId;
      this.$refs.todoDeleteModal.openModal();
    },
    closeDeleteTodoModal() {
      this.resetDeleteTodo();
      this.$refs.todoDeleteModal.closeModal();
    },
    resetDeleteTodo() {
      this.todoDelete = {
        content: null,
        todoId: null,
        loading: false,
        success: false,
      };
    },
    async deleteTodo() {
      try {
        this.todoDelete.loading = true;
        await this.deleteTodoById({ todoId: this.todoDelete.todoId });
        this.todoDelete.loading = false;
        this.todoDelete.success = true;
      } catch (error) {
        this.todoDelete.loading = false;
        this.todoDelete.loading = true;
      }
    },
  },
};
</script>

<style scoped>
@import url("../assets/css/list-view.css");
</style>
