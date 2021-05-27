<!-- @format -->

<template>
  <section class="dashboard">
    <h2 class="color_heading_1 text_center mb-lg">Dashboard</h2>
    <recent-lists v-if="userRecentLists" :lists="userRecentLists" />
    <todos :Todos="dashboardTodos" @deleteTodoById="showDeleteTodoModal" />
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
        <br /><b class="color_danger">{{ todoDelete.content }}</b></template
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
  components: {
    Todos: () => import("@/components/Todos"),
    DeleteModal: () => import("@/components/DeleteModal"),
    RecentLists: () => import("@/components/Lists"),
  },
  name: "Dashboard",
  mounted() {
    this.getDashboardLists();
    this.getDashboardTodos();
  },
  destroyed() {
    this.killDashboardListsListener();
    this.killDashboardTodosListener();
    this.resetDashboardTodos();
    this.resetLists();
  },
  data() {
    return {
      todoDelete: {
        success: false,
        content: null,
        todoId: null,
        loading: false,
      },
    };
  },
  methods: {
    ...mapActions("todos", [
      "deleteTodoById",
      "getDashboardTodos",
      "killDashboardTodosListener",
      "resetDashboardTodos",
    ]),
    ...mapActions("lists", [
      "getDashboardLists",
      "killDashboardListsListener",
      "resetLists",
    ]),
    showDeleteTodoModal(deleteTodoId) {
      let { content, todoId } = this.getDashboardTodoById(deleteTodoId);
      this.todoDelete.content = content;
      this.todoDelete.todoId = todoId;
      this.$refs.todoDeleteModal.openModal();
    },
    closeDeleteTodoModal() {
      this.$refs.todoDeleteModal.closeModal();
      this.todoDelete.content = null;
      this.todoDelete.todoId = null;
      this.todoDelete.success = false;
    },
    async deleteTodo() {
      try {
        this.todoDelete.loading = true;
        await this.deleteTodoById({ todoId: this.todoDelete.todoId });
        this.todoDelete.success = true;
        this.todoDelete.loading = false;
      } catch (error) {
        this.todoDelete.loading = false;
        console.log(error.message);
      }
    },
  },

  computed: {
    ...mapGetters("lists", ["userRecentLists"]),
    ...mapGetters("todos", ["dashboardTodos", "getDashboardTodoById"]),
  },
};
</script>
