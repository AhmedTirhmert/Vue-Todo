<template>
  <section class="dashboard">
    <h2 class="color--heading1 text-center mb-lg">Dashboard</h2>
    <lists :Lists="lists" />
    <todos :Todos="todos" />
  </section>
</template>


<script>
export default {
  components: {
    Todos: () => import("@/components/Todos"),
    Lists: () => import("@/components/Lists"),
  },
  name: "Dashboard",
  data: function () {
    return {
      lists: {
        list1: {
          listId: "list1",
          title: "SPORT",
        },
        list2: {
          listId: "list2",
          title: "STUDY",
        },
      },
      todos: {
        todo1: {
          content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam ducimus nihil dignissimos voluptatibus illo quisquam laudantium sunt, dolor unde repellat.",
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
        todo9: {
          content: "Prepase presentation",
          list_id: "list2",
          created_at: Date.now() - Math.floor(Math.random() * 2122313248),
        },
        todo10: {
          content: "Prepase presentation",
          list_id: "list2",
          created_at: Date.now() - Math.floor(Math.random() * 10216431),
        },
      },
    };
  },
  methods: {
    viewList(listId) {
      console.log(listId);
      this.$router.push({ name: "List", params: { listId: listId } });
    },
  },
  mounted() {},
};
</script>


<style scoped>
</style>

