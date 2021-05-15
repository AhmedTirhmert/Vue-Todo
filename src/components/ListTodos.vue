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
    <div class="new-todo-section radius-sm">
      <span
        class="text_gray_2 text_italic text_center mb-md"
        :class="newTodo.loading ? 'loading' : ''"
        @click="showNewTodoSection"
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
            @keydown.esc="newTodo.visible = false"
            @keyup.ctrl.enter="addNewTodo()"
            placeholder="New Todo..."
          />
          <span class="new-list-input-error px-sm" v-show="addTodoError.message"
            >{{ addTodoError.message }}
            <b
              v-show="addTodoError.todoId"
              @click="undoneTodoById(addTodoError.todoId)"
              >Undone it!</b
            ></span
          >
        </div>
        <button class="btn radius-lg add-todo-btn" @click="addNewTodo()">
          <i class="fa"></i>
        </button>
      </div>
    </div>
    <section v-if="listTodos" class="todos-section">
      <todo
        v-for="(todo, key) in listTodos"
        :key="key"
        :todoKey="key"
        :todo="todo"
        :Editable="true"
        @deleteTodoById="deleteTodoById"
      />
    </section>
    <div v-else class="no-todos">No Todos Yet</div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "listTodos",
  components: {
    Todo: () => import("@/components/Todo"),
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
    ...mapMutations("todos", ["resetNewTodoError"]),
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
    showNewTodoSection() {
      this.newTodo.visible = !this.newTodo.visible;
      if (this.newTodo.visible) {
        this.$nextTick(() => {
          this.$refs.newTodoInput.focus();
        });
      }
    },
    addNewTodo() {
      if (this.newTodo.content && this.newTodo.content.length > 1) {
        this.addTodo({
          listId: this.listId,
          content: this.newTodo.content.trim(),
        });
        this.newTodo.content = null;
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