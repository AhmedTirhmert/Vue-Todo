<template>
  <section class="list">
    <list-todos
      :listId="$route.params.listId"
      @deleteTodoById="deleteTodoModal"
    />
    <delete-modal
      ref="todoDeleteModal"
      :success="deleteTodoSuccess"
      @modalBackdropClose="closeDeleteTodoModal()"
      @closeModal="closeDeleteTodoModal()"
    >
      <template v-slot:header><h1>Delete List</h1> </template>
      <template v-slot:sub-header>
        You sure you wanna delete
        <br /><b class="color--danger">{{ todoDelete.content }}</b></template
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
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "list",
  components: {
    ListTodos: () => import("@/components/ListTodos"),
    DeleteModal: () => import("@/components/DeleteModal"),
  },
  data() {
    return {
      todoDelete: null,
    };
  },
  computed: {
    ...mapGetters("todos", ["getTodoById", "deleteTodoSuccess"]),
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
};
</script>

<style scoped>
@import url("../assets/css/list-view.css");
</style>