import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import lists from "./lists";
import todos from "./todos";
import profile from "./profile";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    auth,
    profile,
    lists,
    todos,
  },
});
