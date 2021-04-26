<template>
  <!-- <div class="todosItem radius-sm" @click="$emit('TodoClicked', Todo.list_id)">
    <p>{{ Todo.content }}</p>
    <span class="text--italic text--end mt-sm">{{
      Todo.created_at | carbonJs()
    }}</span>
  </div> -->
  <div class="todo-containner">
    <div class="todo-content">
      <div class="todos-item radius-sm">
        <textarea
          class="todoInput"
          rows="1"
          type="text"
          v-model.lazy="Todo.content"
          :ref="`autoGrowInput${todoKey}`"
          @input="inputing(`autoGrowInput${todoKey}`)"
        />
        <!-- <p
          class="todosItem radius-sm"
          v-else
          @click="$emit('TodoClicked', Todo.list_id)"
        >
          {{ Todo.content }}
        </p> -->
        <span class="todo-date px-sm text--end text--gray2 text--italic">{{
          Todo.created_at | carbonJs()
        }}</span>
      </div>
    </div>
    <div class="todo-actions">
      <button class="btn radius-lg todo-done" @click="markTodoDone(todoKey)">
        <i class="fa"></i>
      </button>
      <button class="btn radius-lg todo-delete" @click="deleteTodo(todoKey)">
        <i class="fa"></i>
      </button>
    </div>
  </div>
</template>

<script>
import filters from "@/mixins/filters";

export default {
  mixins: [filters],
  name: "Todo",
  props: {
    Todo: {},
    todoKey: {
      type: String,
      required: true,
    },
  },
  methods: {
    inputing(ta) {
      //   console.log(ta);
      //   console.log(this.$refs);

      this.$refs[ta].style.height = "inherit";
      let TA = this.$refs[ta];
      let Computed = window.getComputedStyle(TA);
      let height =
        parseFloat(Computed.paddingTop, 10) +
        parseFloat(Computed.paddingBottom, 10) +
        TA.scrollHeight;
      //   console.log("Scroll Height => ", TA.scrollHeight);
      //   console.log(height);
      TA.style.height = `${height - 20}px`;
      //   console.log("TA height => ", TA.style.height);
    },
    markTodoDone(todoKey) {
      console.log("Done => ", todoKey);
    },
    deleteTodo(todoKey) {
      console.log("Deleting => ", todoKey);
    },
  },
  mounted() {
    this.inputing(`autoGrowInput${this.todoKey}`);
  },
};
</script>

<style>
</style>