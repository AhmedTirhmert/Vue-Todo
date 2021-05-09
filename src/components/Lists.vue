<template>
  <div class="listsBox radius-xs">
    <h2 v-if="Heading" class="radius-sm color--heading2">Lists</h2>
    <div v-if="!Lists" class="noListsSection">No Lists Yet</div>
    <section v-else class="listsSection" :class="Heading ? '' : 'py-lg px-md'">
      <div
        :class="Actions ? 'list-with-actions-containner' : 'list-containner'"
        v-for="(list, key) in Lists"
        :key="key"
      >
        <router-link
          :ref="`Link${list.listId}`"
          class="listsItem radius-sm"
          :to="{ name: 'List', params: { listId: list.listId } }"
        >
          {{ list.title }}
        </router-link>
        <input
          :ref="`Input${list.listId}`"
          class="listInput"
          type="text"
          :value="list.title"
          @keyup.enter="save(list.listId)"
        />

        <button
          :ref="`Edit${list.listId}`"
          @click="editList(list.listId)"
          v-if="Actions"
          class="btn radius-lg listAction color--success"
        >
          <i class="fas fa-pen"></i>
        </button>
        <button
          @click="save(list.listId)"
          :ref="`Save${list.listId}`"
          v-if="Actions"
          class="btn radius-lg listAction color--success"
          style="display: none"
        >
          <i class="fas fa-check"></i>
        </button>
        <button
          @click="deleteList(list.listId)"
          v-if="Actions"
          class="btn radius-lg listAction color--danger"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>

      <div v-if="viewMore" class="viewMoreSection">
        <router-link
          :to="{ name: 'Lists' }"
          class="btn btn-primary radius-md py-sm px-lg"
        >
          All Lists
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Lists",
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
  methods: {
    editList(listId) {
      this.$refs[`Link${listId}`][0].$el.style.display = "none";
      this.$refs[`Input${listId}`][0].style.display = "block";
      this.$refs[`Edit${listId}`][0].style.display = "none";
      this.$refs[`Save${listId}`][0].style.display = "block";
    },
    save(listId) {
      // console.log(this.$refs[`Input${listId}`][0].value);
      this.$refs[`Link${listId}`][0].$el.style.display = "block";
      this.$refs[`Input${listId}`][0].style.display = "none";
      this.$refs[`Edit${listId}`][0].style.display = "block";
      this.$refs[`Save${listId}`][0].style.display = "none";
    },
    deleteList(listId) {
      window.alert("Deleting => " + listId);
    },
  },
};
</script>

<style>
@import url("../assets/css/lists-component.css");
</style>