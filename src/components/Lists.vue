<template>
  <div class="listsBox radius-xs">
    <h2 class="radius-sm">Lists</h2>
    <section class="listsSection">
      <div v-for="(list, key) in Lists" :key="key" class="listsItem radius-sm">
        {{ list.title }}
      </div>
      <div class="viewMoreSection">
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
  },
};
</script>

<style>
</style>