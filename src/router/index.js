import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, _, next) => {
  console.log(store.getters["auth/isAuth"]);
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (store.getters["auth/isAuth"]) {
      next();
    } else {
      next({
        name: "Login",
      });
    }
  } else if (to.matched.some((record) => record.meta.requireGuest)) {
    if (!store.getters["auth/isAuth"]) {
      next();
    } else {
      next({
        name: "Dashboard",
      });
    }
  }
});
export default router;
