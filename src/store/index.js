import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import lists from "./modules/lists";
import todos from "./modules/todos";
import profile from "./modules/profile";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    profile,
    lists,
    todos,
  },
});
