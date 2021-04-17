<template>
  <section class="list">
    <h1 class="text--center py-sm radius-sm text--italic mb-xl">
      <span class="">List Details : </span>
      <span class="text--uppercase text--secondaryColor">{{
        $route.params.listId
      }}</span>
    </h1>
    <list :listTitle="$route.params.listId" :Todos="todos" />
  </section>
</template>

<script>
export default {
  name: "ListView",
  components: {
    list: () => import("../components/listComponent"),
  },
  data() {
    return {
      todos: {
        todo4: {
          content:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta consectetur quo obcaecati facere totam alias temporibus dolores eligendi nam dolorum.",
          list_id: "list2",
          created_at: Date.now() - Math.floor(Math.random() * 1001220250),
        },
        todo5: {
          content: "play some league",
          list_id: "list1",
          created_at: Date.now() - Math.floor(Math.random() * 10125),
        },
        todo6: {
          content: "Complete paython course",
          list_id: "list2",
          created_at: Date.now() + Math.floor(Math.random() * 10),
        },
        todo7: {
          content: "Commit changes to Github",
          list_id: "list2",
          created_at: Date.now() + Math.floor(Math.random() * 10),
        },
        todo8: {
          content: "Prepase presentation",
          list_id: "list2",
          created_at: Date.now() + Math.floor(Math.random() * 10),
        },
      },
    };
  },
};
</script>

<style>
@import url("../Style/ListView.css");
</style>