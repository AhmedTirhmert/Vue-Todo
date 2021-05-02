<template>
  <div class="listBox radius-xs">
    <div class="listTitle">
      <h2 class="radius-sm px-lg py-xs color--heading2">{{ listTitle }}</h2>
    </div>
    <div class="new-todo-section radius-sm">
      <span
        class="text--gray2 text--italic text--center mb-md"
        :class="newTodo.loading ? 'loading' : ''"
        @click="newTodo.visible = !newTodo.visible"
        >Click to add new Todos...</span
      >
      <div class="new-todo-loading" v-if="newTodo.loading">
        <i class="fas fa-spinner fa-pulse"></i>
      </div>
      <div
        class="new-todo"
        v-if="newTodo.visible"
        :class="newTodo.loading ? 'loading' : ''"
      >
        <textarea
          class="new-todo-input"
          type="text"
          ref="newTodoInput"
          v-model.lazy="newTodo.content"
          @input="autoGrowInput()"
          placeholder="New Todo..."
        />
        <button class="btn radius-lg add-todo-btn" @click="addTodo()">
          <i class="fa"></i>
        </button>
      </div>
    </div>
    <section v-if="Todos" class="todosSection">
      <todo
        v-for="(todo, key) in Todos"
        :key="key"
        :todoKey="key"
        :todo="todo"
        :Editable="true"
      />
    </section>
    <div v-else class="no-todos">No Todos</div>
  </div>
</template>

<script>
export default {
  name: "listTodos",
  components: {
    Todo: () => import("@/components/Todo"),
  },
  props: {
    listTitle: {
      type: String,
      required: true,
    },
    Todos: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newTodo: {
        visible: false,
        loading: false,
        content: null,
      },
    };
  },
  mounted() {
    this.autoGrowInput();
  },
  methods: {
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
    addTodo() {
      this.newTodo.loading = true;
      this.Todos["todos1"] = {
        content: this.newTodo.content,
        list_id: "list2",
        created_at: Date.now() - Math.floor(Math.random() * 1001220250),
      };

      setTimeout(() => {
        this.newTodo.loading = false;
        this.newTodo.visible = false;
        this.newTodo.content = null;
      }, 3000);
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