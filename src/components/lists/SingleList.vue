<!-- @format -->

<template>
  <div
    class="mb-sm"
    :class="actions ? 'list-with-actions-containner' : 'list-containner'"
  >
    <router-link
      :ref="`Link`"
      class="lists-item radius-sm"
      :to="{ name: 'List', params: { listId: list.listId } }"
    >
      {{ list.title }}
    </router-link>
    <div class="list-edit-input-group" :ref="`updateListInputGroup`">
      <div class="flex flex-c">
        <input
          ref="updateListInput"
          class="list-input"
          type="text"
          :value="list.title"
          @keydown.enter="saveChanges(list.listId)"
          @keydown.esc="hideEditListInput"
        />
        <span class="update-list-input-error mx-sm mt-xs" v-if="error.message"
          >{{ error.message }}, <b @click="hideEditListInput">Cancel</b></span
        >
      </div>
    </div>

    <button
      :ref="`Edit`"
      @click="showEditListInput()"
      v-if="actions"
      class="btn radius-lg list-action color_success"
    >
      <i class="fas fa-pen"></i>
    </button>
    <button
      @click="saveChanges(list.listId)"
      :ref="`Save`"
      v-if="actions"
      class="btn radius-lg list-action color_success"
      style="display: none"
    >
      <i class="fas fa-check"></i>
    </button>
    <button
      @click="$emit('openDeleteListModal', list.listId)"
      v-if="actions"
      class="btn radius-lg list-action color_danger"
    >
      <i class="fas fa-trash"></i>
    </button>
  </div>
</template>
<script>
import methodes from "@/mixins/methods";
import { mapActions } from "vuex";
export default {
  name: "SingleList",
  mixins: [methodes],
  props: {
    actions: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      error: {
        message: null,
      },
    };
  },
  methods: {
    ...mapActions("lists", ["updateListById"]),
    showEditListInput() {
      this.$refs[`Link`].$el.style.display = "none";
      this.$refs[`updateListInputGroup`].style.display = "block";
      this.$refs[`Edit`].style.display = "none";
      this.$refs[`Save`].style.display = "block";
      this.$refs[`updateListInputGroup`].focus();
    },
    hideEditListInput() {
      this.$refs[`updateListInputGroup`].value = this.list.title;
      this.$refs[`Link`].$el.style.display = "block";
      this.$refs[`updateListInputGroup`].style.display = "none";
      this.$refs[`Edit`].style.display = "block";
      this.$refs[`Save`].style.display = "none";
      this.error.message = null;
    },
    async saveChanges(listId) {
      this.error.message = null;
      let updatedListValue = this.$refs[`updateListInput`].value;
      if (
        updatedListValue &&
        this.titleCase(updatedListValue) != this.list.title
      ) {
        try {
          await this.updateListById({
            listId: listId,
            title: this.titleCase(updatedListValue),
          });
          this.hideEditListInput();
        } catch (error) {
          this.error.message = error.message;
        }
      } else {
        this.hideEditListInput();
      }
    },
  },
};
</script>

<style></style>
