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
      import(/* webpackChunkName: "todos" */ "../views/Todos.vue"),
  },
  {
    path: "/list/:listId",
    name: "List",
    component: () => import(/* webpackChunkName: "list" */ "../views/List.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Auth/Login"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Auth/Register"),
  },
  {
    path: "/lists",
    name: "Lists",
    component: () => import(/* webpackChunkName: "Lists" */ "../views/Lists"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import(/* webpackChunkName: "Lists" */ "../views/Profile"),
  },
];

export default routes;
