<template>
  <div class="listBox radius-xs">
    <div class="listTitle">
      <h2
        v-if="getListById(listId)"
        class="radius-sm px-lg py-xs color--heading2"
      >
        {{ getListById(listId).title }}
      </h2>
    </div>
    <div class="new-todo-section radius-sm">
      <span
        class="text--gray2 text--italic text--center mb-md"
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
    <section v-if="listTodos" class="todosSection">
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
        textArea.style.height = `${height - 20}px`;
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

<style  scoped>
.new-todo-section {
  position: relative;
  padding: 0rem 1.5rem 1rem 1.5rem;
  display: flex;
  flex-direction: column;
}
.new-todo-section > span {
  font-size: 0.9rem;
  cursor: pointer;
}

.new-todo {
  display: grid;
  grid-template-columns: 10fr 2fr;
}
.new-todo-input {
  border: none;
  padding: 0.7em 1em 0.7em 0.7em;
  width: 100%;
  overflow: hidden;
  resize: none;
  border-radius: 0.5rem;
  font-family: var(--ubuntu);
  font-size: 1rem;
  outline: none;
  height: 42.5px;
  background-color: var(--cardBg);
  display: inline-block;
  color: rgba(44, 43, 43, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.new-todo-input:focus {
  color: black;
  background-color: white;
  filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2));
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.add-todo-btn {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  outline: none;
  border: 1px solid var(--borderPrimaryColor);
}
.add-todo-btn > i::before {
  font-family: "Font Awesome 5 Free";
  content: "\f055";
  font-size: 1.7rem;
  color: var(--success);
}
.add-todo-btn:hover {
  filter: drop-shadow(3px 6px 2px rgba(0, 0, 0, 0.2));
}
.loading {
  filter: blur(2px) grayscale(30);
  pointer-events: none;
}

.new-todo-loading {
  position: absolute;
  z-index: 10;
  text-align: center;
  font-size: 2rem;
  color: var(--success);
  top: 30px;
  right: 0;
  left: 0;
  bottom: 0;
  cursor: progress;
}
.no-todos {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  font-size: 2.3rem;
  font-family: var(--ubuntu);
  font-weight: 400;
  font-style: italic;
  color: var(--gray2);
}
</style>