<template>
  <section class="dashboard">
    <h2 class="text--gray4 text-center mb-lg">Dashboard</h2>
    <lists :Lists="lists" />
    <todos :Todos="todos" @TodoClicked="viewList" />
  </section>
</template>


<script>
export default {
  components: {
    Todos: () => import("../components/Todos"),
    Lists: () => import("../components/Lists"),
  },
  name: "Dashboard",
  data: function () {
    return {
      lists: {
        list1: {
          title: "SPORT",
        },
        list2: {
          title: "STUDY",
        },
      },
      todos: {
        todo1: {
          content: "1 Mile Runing",
          list_id: "list1",
          created_at: Date.now() + Math.floor(Math.random() * 10),
        },
        todo2: {
          content: "Workout after work",
          list_id: "list1",
          created_at: Date.now() + Math.floor(Math.random() * 10),
        },
        todo3: {
          content: "do homeword",
          list_id: "list2",
          created_at: Date.now() + Math.floor(Math.random() * 1000),
        },
        todo4: {
          content: "create todo app",
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
  methods: {
    viewList(listId) {
      this.$router.push({ name: "List", params: { listId: listId } });
    },
  },
  mounted() {},
};
</script>


<style scoped>
</style>

