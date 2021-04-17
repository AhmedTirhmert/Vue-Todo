<template>
  <div class="listsBox radius-xs">
    <h2 v-if="Heading" class="radius-sm color--heading2">Lists</h2>
    <div v-if="!Lists" class="noListsSection">No Lists Yet</div>
    <section v-else class="listsSection" :class="Heading ? '' : 'py-lg px-md'">
      <div class="listContainner" v-for="(list, key) in Lists" :key="key">
        <input
          v-if="Edittable"
          class="listInput"
          type="text"
          :value="list.title"
        />
        <div v-else class="listsItem radius-sm">
          {{ list.title }}
        </div>
        <button class="btn radius-lg listAction color--danger">
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
    Edittable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
@import url("../Style/listsComponent.css");
</style>