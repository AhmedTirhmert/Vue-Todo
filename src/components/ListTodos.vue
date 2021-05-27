<!-- @format -->

<template>
  <div class="list-box radius-xs">
    <div class="list-title">
      <h2
        v-if="getListById(listId)"
        class="radius-sm px-lg py-xs color_heading_2"
      >
        {{ getListById(listId).title }}
      </h2>
    </div>
    <add-todo-form :listId="listId" />
    <section v-if="listTodos" class="todos-section">
      <todo
        v-for="(todo, key) in listTodos"
        :key="key"
        :todoKey="todo.todoId"
        :todo="todo"
        :Editable="true"
        @deleteTodoById="deleteTodoById"
      />
    </section>
    <div v-else class="no-todos">No Todos Yet</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "listTodos",
  components: {
    Todo: () => import("@/components/Todo"),
    AddTodoForm: () => import("@/components/todos/AddTodoForm"),
  },
  props: {
    listId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newTodo: {
        content: null,
        visible: false,
      },
    };
  },
  created() {
    this.getListTodos(this.listId);
  },
  mounted() {
    this.autoGrowInput();
  },
  methods: {
    ...mapActions("todos", ["addTodo", "getListTodos", "undoneTodoById"]),
    autoGrowInput() {
      if (this.newTodo.visible) {
        this.$refs.newTodoInput.style.height = "inherit";
        let textArea = this.$refs.newTodoInput;
        let Computed = window.getComputedStyle(textArea);
        let height =
          parseFloat(Computed.paddingTop, 10) +
          parseFloat(Computed.paddingBottom, 10) +
          textArea.scrollHeight;
        textArea.style.height = `${height - 25}px`;
      }
    },

    deleteTodoById(value) {
      this.$emit("deleteTodoById", value);
    },
  },
  computed: {
    ...mapGetters("lists", ["getListById"]),
    ...mapGetters("todos", ["listTodos", "addTodoLoading", "addTodoError"]),
  },
  watch: {
    "newTodo.visible"(val) {
      if (!val) {
        this.resetNewTodoError();
      }
    },
  },
};
</script>

<style scoped>
@import url("../assets/css/list-todos.css");
</style>
