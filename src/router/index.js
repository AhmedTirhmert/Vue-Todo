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
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    // console.log("is Auth Rest => ", store.getters["auth/isAuth"]);

    if (store.getters["auth/isAuth"]) {
      next();
    } else {
      next({
        name: "Login",
      });
    }
  } else if (to.matched.some((record) => record.meta.requireGuest)) {
    // console.log(
    // "is Auth Login/Register => ",
    // store.getters["auth/isAuth"]
    // );
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
