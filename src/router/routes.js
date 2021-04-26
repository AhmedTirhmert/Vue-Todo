const routes = [
  {
    path: "/login",
    name: "Login",
    meta: {
      requireGuest: true,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Auth/Login"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      requireGuest: true,
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "@/views/Auth/Register"),
  },
  {
    path: "/",
    name: "Dashboard",
    meta: {
      requireAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Dashboard.vue"),
  },
  {
    path: "/todos",
    name: "Todos",
    meta: {
      requireAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "todos" */ "@/views/Todos.vue"),
  },
  {
    path: "/list/:listId",
    name: "List",
    meta: {
      requireAuth: true,
    },
    component: () => import(/* webpackChunkName: "list" */ "@/views/List.vue"),
  },
  {
    path: "/lists",
    name: "Lists",
    meta: {
      requireAuth: true,
    },
    component: () => import(/* webpackChunkName: "Lists" */ "@/views/Lists"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      requireAuth: true,
    },
    component: () => import(/* webpackChunkName: "Lists" */ "@/views/Profile"),
  },
];

export default routes;
