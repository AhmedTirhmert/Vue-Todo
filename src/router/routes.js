const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
  },
  {
    path: "/todos",
    name: "Todos",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Todos.vue"),
  },
  {
    path: "/list/:listId",
    name: "List",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/List.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Auth/Login"),
  },
];

export default routes;
