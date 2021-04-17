<template>
  <section class="containner">
    <h2 class="color--heading1 mb-md">Lists</h2>
    <lists
      :heading="false"
      :viewMore="false"
      :Lists="lists"
      :Edittable="true"
    />
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
          title: "SPORT",
        },
        list2: {
          title: "STUDY",
        },
        list3: {
          title: "FOOD",
        },
        list4: {
          title: "GROCERY",
        },
        list5: {
          title: "WORKOUT",
        },
        list6: {
          title: "YOGA",
        },
        list7: {
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