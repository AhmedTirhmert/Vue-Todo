<template>
  <section class="dashboard">
    <h2 class="color_heading_1 text_center mb-lg">Dashboard</h2>
    <lists v-if="dashboardUserLists" :Lists="dashboardUserLists" />
    <todos :Todos="userRecentTodos" @deleteTodoById="deleteTodoModal" />
    <delete-modal
      ref="todoDeleteModal"
      :success="deleteTodoSuccess"
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
        <button class="accept" @click="deleteTodoById(todoDelete.todoId)">
          Yes
        </button>
      </template>
    </delete-modal>
  </section>
</template>


<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    Todos: () => import("@/components/Todos"),
    DeleteModal: () => import("@/components/DeleteModal"),
    Lists: () => import("@/components/Lists"),
  },
  name: "Dashboard",
  data: function () {
    return {
      todoDelete: null,
    };
  },
  methods: {
    ...mapActions("todos", ["deleteTodoById"]),
    ...mapMutations("todos", ["setDeleteTodoSuccess"]),
    deleteTodoModal(listId) {
      this.todoDelete = this.getTodoById(listId);
      this.$refs.todoDeleteModal.openModal();
    },
    closeDeleteTodoModal() {
      this.$refs.todoDeleteModal.closeModal();
      this.setDeleteTodoSuccess(false);
      this.todoDelete = null;
    },
  },

  computed: {
    ...mapGetters("lists", ["dashboardUserLists"]),
    ...mapGetters("todos", [
      "userRecentTodos",
      "getTodoById",
      "deleteTodoSuccess",
    ]),
  },
};
</script>

