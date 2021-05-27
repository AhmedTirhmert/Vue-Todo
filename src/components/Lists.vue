<!-- @format -->

<template>
  <div class="lists-box radius-xs">
    <h2 v-if="Heading" class="radius-sm color_heading_2">Lists</h2>

    <add-list-form v-if="actions" />
    <section class="lists-section" :class="Heading ? '' : 'py-lg px-md'">
      <div v-if="lists.length == 0" class="no-lists">No Lists Yet</div>
      <div v-else>
        <single-list
          v-for="(list, key) in lists"
          :key="key"
          :list="list"
          :actions="actions"
          @openDeleteListModal="openDeleteListModal"
        />
      </div>
      <div v-if="viewMore" class="view-more-section">
        <router-link
          :to="{ name: 'Lists' }"
          class="btn btn-primary radius-md py-sm px-lg"
        >
          {{ lists.length == 0 ? "Add Lists" : "All Lists" }}
        </router-link>
      </div>
    </section>
    <delete-modal
      ref="deleteModal"
      :success="listDelete.success"
      :loading="listDelete.loading"
      @closeModal="closeDeleteListModal()"
      @modalBackdropClose="closeDeleteListModal()"
    >
      <template v-slot:header><h1>Delete List</h1> </template>
      <template v-slot:sub-header>
        You sure you wanna delete
        <br /><b class="color_danger">{{ listDelete.title }}</b></template
      >
      <template v-slot:footer>
        <button
          class="cancel"
          :class="listDelete.loading ? 'modal-loading' : ''"
          @click="closeDeleteListModal()"
        >
          Cancel
        </button>
        <button
          class="accept"
          :class="listDelete.loading ? 'modal-loading' : ''"
          @click="deleteList(listDelete.listId)"
        >
          Yes
        </button>
      </template>
    </delete-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import methodes from "@/mixins/methods";
export default {
  name: "userLists",
  props: {
    lists: {
      type: Array,
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
    actions: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [methodes],
  components: {
    DeleteModal: () => import("@/components/DeleteModal"),
    AddListForm: () => import("@/components/lists/AddListForm"),
    SingleList: () => import("@/components/lists/SingleList"),
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
        loading: false,
        success: false,
      },
    };
  },
  methods: {
    ...mapActions("lists", [
      "addList",
      "getUserLists",
      "updateListById",
      "deleteListById",
    ]),

    showNewlistSection() {
      this.newList.visible = true;
    },
    openDeleteListModal(listId) {
      this.$refs.deleteModal.openModal();
      this.listDelete.listId = listId;
      this.listDelete.title = this.lists[
        this.lists.findIndex((list) => list.listId == listId)
      ].title;
    },
    closeDeleteListModal() {
      this.$refs.deleteModal.closeModal();
      this.listDelete.success = false;
    },
    async deleteList(listId) {
      try {
        this.listDelete.loading = true;
        await this.deleteListById(listId);
        this.listDelete.loading = false;
        this.listDelete.success = true;
      } catch (error) {
        console.log(error.message);
        this.listDelete.loading = false;
        this.listDelete.success = true;
      }
    },
  },
  computed: {
    ...mapGetters("lists", ["getListById"]),
  },
  watch: {},
};
</script>

<style scoped>
@import url("../assets/css/lists-component.css");
</style>
