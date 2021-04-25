import Vue from "vue";
import router from "../router";
// import { v1 as UID } from "uuid";
import { fb_auth } from "../firebase/index";
import { fb_firestore } from "../firebase/index";
// Global Variables
//where the auth data goes
const state = {
  current_user: null,
  Errors: {
    loginError: null,
    registerError: null,
  },
};
//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {
  setCurrentUser(state, payload) {
    state.current_user = payload;
  },
  setLoginError(state, payload) {
    Vue.set(state.Errors, "loginError", payload);
  },
  setRegisterError(state, payload) {
    Vue.set(state.Errors, "registerError", payload);
  },
};
//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  registerUser({ commit }, payload) {
    console.log(payload);
    fb_auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        let User = fb_auth.currentUser;
        fb_firestore
          .collection("Users")
          .doc(User.uid)
          .set({
            user_id: User.uid,
            fullName: payload.fullName,
            email: payload.email,
            picture: payload.picture ? payload.picture.name : "",
            created_at: Date.now(),
          })
          .then(() => {
            let actionCodeSettings = {
              url: `${process.env.VUE_APP_HOST_NAME}/login/?email=${User.email}`,
            };

            User.sendEmailVerification(actionCodeSettings);
            commit(
              "setRegisterError",
              "Verification Email was sent to your inbox "
            );
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        commit("setRegisterError", error.message);
      });
  },
  loginUser({ commit }, payload) {
    fb_auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        let User = fb_auth.currentUser;
        console.log(User);
        if (User.emailVerified) {
          commit("setCurrentUser", User);
          router.push({ name: "Dashboard" });
        } else {
          commit("setLoginError", "You must verify your Email to Log In");
        }
      })
      .catch((error) => {
        commit("setLoginError", "Incorrect Email or Password ");
        console.log(error.message);
      });
  },
  logoutUser({ commit }) {
    fb_auth.signOut();
    commit("setCurrentUser", null);
    router.push({ name: "Login" });
  },
  HandleAuthStateChange({ commit }) {
    fb_auth.onAuthStateChanged((User) => {
      if (User && User.emailVerified) {
        // console.log("Current User is => ", User);
        commit("setCurrentUser", User);
      } else {
        // console.log("No Current User");
        commit("setCurrentUser", null);
      }
    });
  },
};
//methods to get data from state object and make availible in vue components
const getters = {
  loginError: (state) => {
    return state.Errors.loginError;
  },
  registerError: (state) => {
    return state.Errors.registerError;
  },
  isAuth: (state) => {
    return state.current_user ? true : false;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
