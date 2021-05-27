<!-- @format -->

<template>
  <div class="new-list-section radius-sm mx-md mt-md">
    <span
      v-if="!newList.visible"
      class="text_gray_2 text_italic text_center mb-sm"
      :class="newList.loading ? 'loading' : ''"
      @click="showAddListForm"
      >Click to add new List...</span
    >
    <div class="new-list-loading" v-if="newList.loading">
      <i class="fas fa-spinner fa-pulse"></i>
    </div>
    <form
      class="new-list"
      v-show="newList.visible"
      :class="newList.loading ? 'loading' : ''"
      @submit.prevent="addList"
      @reset.prevent="hideAddListForm"
    >
      <div class="new-list-input-section">
        <input
          class="new-list-input"
          type="text"
          :ref="`newListInput`"
          v-model.lazy="newList.title"
          placeholder="New List..."
          @keydown.esc="hideAddListForm"
          autofocus
        />
        <span class="new-list-input-error px-sm" v-if="newList.error"
          >{{ newList.error }}
        </span>
      </div>
      <button type="submit" class="btn radius-lg add-list-btn">
        <i class="fa"></i>
      </button>
      <button type="reset" class="btn radius-lg close-btn">
        <i class="fa"></i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import methods from "@/mixins/methods";
export default {
  mixins: [methods],
  data() {
    return {
      newList: {
        visible: false,
        title: null,
        error: null,
        loading: false,
      },
    };
  },
  methods: {
    ...mapActions("lists", ["createList"]),
    showAddListForm() {
      this.newList.visible = true;
      this.$nextTick(() => {
        this.$refs.newListInput.focus();
      });
    },
    hideAddListForm() {
      this.newList.visible = false;
      this.newList.title = null;
      this.newList.error = null;
    },
    async addList() {
      try {
        if (this.newList.title) {
          this.newList.error = null;
          this.newList.loading = true;
          await this.createList(this.titleCase(this.newList.title));
          this.newList.loading = false;
          this.newList.title = null;
        }
      } catch (error) {
        this.newList.loading = false;
        this.newList.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/components/lists/add-list-form.css");
</style>
