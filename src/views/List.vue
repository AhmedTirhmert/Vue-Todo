<template>
  <section class="list">
    <h1 class="text--center py-sm radius-sm text--italic mb-xl">
      <span class="">List Details : </span>
      <span class="text--uppercase text--gray3">{{
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
@import url("../Style/Variables.css");

.list {
  display: flex;
  flex-direction: column;
}
.list > h1 {
  background-color: var(--cardBg);
  filter: drop-shadow(0px 1px 12px rgba(0, 0, 0, 0.07));
}
.list > h1 > span {
  font-style: none;
}
.listBox {
  position: relative;
  margin-bottom: 3em;
  /* border: 1px solid var(--primaryColor); */
  background-color: var(--cardBg);
  filter: drop-shadow(0px 1px 12px rgba(0, 0, 0, 0.07));
}
.listTitle {
  position: relative;
  left: 1em;
  top: -1.3rem;
  background: var(--cardBg);
  max-width: max-content;
  border: 1px solid var(--borderPrimaryColor);
  font-weight: 500;
}
.listSection {
  padding: 0rem 1.5rem 1rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.4em;
}
.listSection .listTodo {
  /* border: 1px solid var(--primaryColor); */
  background-color: var(--notWhite);
  filter: drop-shadow(0px 0px 2px rgba(29, 53, 87, 0.2));
}
</style>