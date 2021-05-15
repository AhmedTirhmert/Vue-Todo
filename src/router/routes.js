const routes = [
  {
    path: "/login",
    name: "Login",
    meta: {
      requireGuest: true,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/auth/Login"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      requireGuest: true,
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "@/views/auth/Register"),
  },
  {
    path: "/",
    name: "Dashboard",
    meta: {
      requireAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
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
    component: () => import(/* webpackChunkName: "lists" */ "@/views/Lists"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      requireAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ "@/views/Profile"),
  },
];

export default routes;
