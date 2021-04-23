<template>
  <section class="">
    <h2 class="color--heading1 mb-md">Lists</h2>
    <lists :heading="false" :viewMore="false" :Lists="lists" :Actions="true" />
  </section>
</template>

<script>
export default {
  components: {
    Lists: () => import("../components/Lists"),
  },
  data() {
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
        list3: {
          listId: "list3",
          title: "FOOD",
        },
        list4: {
          listId: "list4",
          title: "GROCERY",
        },
        list5: {
          listId: "list5",
          title: "WORKOUT",
        },
        list6: {
          listId: "list6",
          title: "YOGA",
        },
        list7: {
          listId: "list7",
          title: "HOMEWORK",
        },
      },
    };
  },
};
</script>

<style>
@import url("../Style/Views/Lists.css");
</style>