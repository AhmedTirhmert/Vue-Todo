import Vue from "vue";
import { fb_auth } from "../firebase/index";
// Global Variables
//where the auth data goes
const state = {
  current_user: {
    infos: {},
    auth_state: false,
  },
};
//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {
  setCurrentUser({ state }, payload) {
    Vue.set(state.current_user, "infos", payload);
  },
  setAuthentication({ state }, payload) {
    Vue.set(state.current_user, "auth_state", payload);
  },
};
//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  registerUser({ commit }, payload) {
    console.log(fb_auth);
    fb_auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((User) => {
        console.log(User);
        commit("setCurrentUser", User);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
//methods to get data from state object and make availible in vue components
const getters = {};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
