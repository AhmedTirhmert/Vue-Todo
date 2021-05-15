<template>
  <div class="lists-box radius-xs">
    <h2 v-if="Heading" class="radius-sm color_heading_2">Lists</h2>

    <div v-if="!Lists" class="no-lists-section">No Lists Yet</div>

    <section class="lists-section" :class="Heading ? '' : 'py-lg px-md'">
      <div v-if="Actions" class="new-list-section radius-sm">
        <span
          v-if="!newList.visible"
          class="text_gray_2 text_italic text_center mb-sm"
          :class="addListLoading ? 'loading' : ''"
          @click="showNewlistSection()"
          >Click to add new List...</span
        >
        <div class="new-list-loading" v-if="addListLoading">
          <i class="fas fa-spinner fa-pulse"></i>
        </div>
        <div
          class="new-list"
          v-show="newList.visible"
          :class="addListLoading ? 'loading' : ''"
        >
          <div class="new-list-input-section">
            <input
              class="new-list-input"
              type="text"
              :ref="`newListInput`"
              v-model.lazy="newList.title"
              placeholder="New List..."
              @keyup.enter="add()"
              @keydown.esc="newList.visible = false"
            />
            <span class="new-list-input-error px-sm" v-show="addListError"
              >{{ addListError }}
            </span>
          </div>

          <button class="btn radius-lg add-list-btn" @click="add()">
            <i class="fa"></i>
          </button>
          <button
            class="btn radius-lg close-btn"
            @click="newList.visible = false"
          >
            <i class="fa"></i>
          </button>
        </div>
      </div>
      <div v-if="Object.keys(Lists).length == 0" class="no-lists">
        No Lists Yet
      </div>
      <div v-else>
        <div
          class="mb-sm"
          :class="Actions ? 'list-with-actions-containner' : 'list-containner'"
          v-for="(list, key) in Lists"
          :key="key"
        >
          <router-link
            :ref="`Link${list.listId}`"
            class="lists-item radius-sm"
            :to="{ name: 'List', params: { listId: list.listId } }"
          >
            {{ list.title }}
          </router-link>
          <input
            :ref="`updateListInput${list.listId}`"
            class="list-input"
            type="text"
            :value="list.title"
            @keydown.enter="saveChanges(list.listId)"
          />
          <button
            :ref="`Edit${list.listId}`"
            @click="showEditListInput(list.listId)"
            v-if="Actions"
            class="btn radius-lg list-action color_success"
          >
            <i class="fas fa-pen"></i>
          </button>
          <button
            @click="saveChanges(list.listId)"
            :ref="`Save${list.listId}`"
            v-if="Actions"
            class="btn radius-lg list-action color_success"
            style="display: none"
          >
            <i class="fas fa-check"></i>
          </button>
          <button
            @click="openDeleteListModal(list.listId)"
            v-if="Actions"
            class="btn radius-lg list-action color_danger"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div v-if="viewMore" class="view-more-section">
        <router-link
          :to="{ name: 'Lists' }"
          class="btn btn-primary radius-md py-sm px-lg"
        >
          {{ Object.keys(Lists).length == 0 ? "Add Lists" : "All Lists" }}
        </router-link>
      </div>
    </section>
    <delete-modal
      ref="deleteModal"
      :success="deleteListSuccess"
      @closeModal="closeDeleteListModal()"
    >
      <template v-slot:header><h1>Delete List</h1> </template>
      <template v-slot:sub-header>
        You sure you wanna delete
        <br /><b class="color_danger">{{ listDelete.title }}</b></template
      >
      <template v-slot:footer>
        <button class="cancel" @click="closeDeleteListModal()">Cancel</button>
        <button class="accept" @click="deleteListById(listDelete.listId)">
          Yes
        </button>
      </template>
    </delete-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import methodes from "@/mixins/methods";
export default {
  name: "userLists",
  props: {
    Lists: {
      type: Object,
      required: true,
    },
    Heading: {
      type: Boolean,
      default: true,
    },
    viewMore: {
      type: Boolean,
      default: true,
    },
    Edit: {
      type: Boolean,
      default: false,
    },
    Actions: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [methodes],
  components: {
    DeleteModal: () => import("@/components/DeleteModal"),
  },

  data() {
    return {
      newList: {
        visible: false,
        title: null,
      },
      listDelete: {
        listId: null,
        title: null,
      },
    };
  },
  methods: {
    ...mapActions("lists", ["addList", "updateListById", "deleteListById"]),
    ...mapMutations("lists", ["setNewListError", "setDeleteListSuccess"]),

    showNewlistSection() {
      this.newList.visible = true;
      const newListInput = this.$refs.newListInput;
      this.$nextTick(() => {
        newListInput.focus();
      });
    },
    showEditListInput(listId) {
      this.$refs[`Link${listId}`][0].$el.style.display = "none";
      this.$refs[`updateListInput${listId}`][0].style.display = "block";
      this.$refs[`Edit${listId}`][0].style.display = "none";
      this.$refs[`Save${listId}`][0].style.display = "block";
    },
    saveChanges(listId) {
      this.$refs[`Link${listId}`][0].$el.style.display = "block";
      this.$refs[`updateListInput${listId}`][0].style.display = "none";
      this.$refs[`Edit${listId}`][0].style.display = "block";
      this.$refs[`Save${listId}`][0].style.display = "none";
      let updatedListValue = this.$refs[`updateListInput${listId}`][0].value;
      this.updateListById({
        listId: listId,
        title: this.titleCase(updatedListValue),
      });
    },
    openDeleteListModal(listId) {
      this.$refs.deleteModal.openModal();
      this.listDelete.listId = listId;
      this.listDelete.title = this.Lists[this.listDelete.listId].title;
    },
    closeDeleteListModal() {
      this.$refs.deleteModal.closeModal();
      this.setDeleteListSuccess(false);
    },
    add() {
      if (this.newList.title) {
        this.addList(this.titleCase(this.newList.title));
        this.newList.title = null;
      }
    },
  },
  computed: {
    ...mapGetters("lists", [
      "addListLoading",
      "addListError",
      "deleteListSuccess",
    ]),
  },
  watch: {
    addListLoading(newVal) {
      if (!newVal && !this.addListError) {
        this.newList.visible = false;
      }
    },
  },
};
</script>

<style scoped>
@import url("../assets/css/lists-component.css");
</style>