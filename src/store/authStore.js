import Vue from "vue";
import router from "../router";
import { fbAuth } from "../firebase/index";
import { fbFirestore } from "../firebase/index";
import { fbStorage } from "../firebase/index";

// Global Variables
const defaultAvatarURL =
  "https://firebasestorage.googleapis.com/v0/b/todoapp-63f53.appspot.com/o/ProfilePictures%2Favatar.png?alt=media&token=7f21f249-3d97-4467-8062-edca5265fa93";
//where the auth data goes
const state = {
  current_user: null,
  Errors: {
    loginError: null,
    registerError: null,
  },
  Loadings: {
    login: false,
    register: false,
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
  setLoginLoading(state, payload) {
    Vue.set(state.Loadings, "login", payload);
  },
  setRegisterLoading(state, payload) {
    Vue.set(state.Loadings, "register", payload);
  },
};
//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  createUserWithProfilePicture({ commit }, payload) {
    let User = fbAuth.currentUser;
    fbStorage
      .ref(`ProfilePictures/${User.uid}`)
      .put(payload.picture)
      .then((res) => {
        res.ref.getDownloadURL().then((url) => {
          fbFirestore
            .collection("Users")
            .doc(User.uid)
            .set({
              user_id: User.uid,
              fullName: payload.fullName,
              email: payload.email,
              picture: url,
              created_at: Date.now(),
            })
            .then(() => {
              let actionCodeSettings = {
                url: `${process.env.VUE_APP_HOST_NAME}/login/?email=${User.email}`,
              };

              User.sendEmailVerification(actionCodeSettings);
              commit("setRegisterLoading", false);
              commit(
                "setRegisterError",
                "Verification Email was sent to your inbox "
              );
            })
            .catch((error) => {
              console.error(error.message);
              commit("setRegisterError", "Something went Wrong :(");
              commit("setRegisterLoading", false);
            });
        });
      })
      .catch((error) => {
        console.error(error.message);
        commit("setRegisterError", "Something went Wrong :(");
        commit("setRegisterLoading", false);
      });
  },
  createUserWithoutProfilePicture({ commit }, payload) {
    let User = fbAuth.currentUser;
    fbFirestore
      .collection("Users")
      .doc(User.uid)
      .set({
        user_id: User.uid,
        fullName: payload.fullName,
        email: payload.email,
        picture: defaultAvatarURL,
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
        commit("setRegisterLoading", false);
      })
      .catch((error) => {
        console.error(error.message);
        commit("setRegisterError", "Something went Wrong :(");
        commit("setRegisterLoading", false);
      });
  },
  registerUser({ commit, dispatch }, payload) {
    // console.log(payload);
    commit("setRegisterLoading", true);
    fbAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        if (payload.picture) {
          dispatch("createUserWithProfilePicture", payload);
        } else {
          dispatch("createUserWithoutProfilePicture", payload);
        }
        fbAuth.signOut();
      })
      .catch((error) => {
        console.error(error.message);
        commit("setRegisterError", error.message);
        commit("setRegisterLoading", false);
      });
  },
  loginUser({ commit }, payload) {
    commit("setLoginLoading", true);
    fbAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        let User = fbAuth.currentUser;
        // console.log(User);
        if (User.emailVerified) {
          commit("setCurrentUser", User);
          router.push({ name: "Dashboard" });
          commit("setLoginLoading", false);
        } else {
          commit("setLoginError", "You must verify your Email to Log In");
          commit("setLoginLoading", false);
          fbAuth.signOut();
        }
      })
      .catch((error) => {
        commit("setLoginError", "Incorrect Email or Password ");
        console.error(error.message);
        commit("setLoginLoading", false);
      });
  },
  logoutUser({ commit }) {
    fbAuth.signOut();
    commit("setCurrentUser", null);
    router.push({ name: "Login" });
  },
  HandleAuthStateChange({ commit }) {
    return new Promise((resolve, reject) => {
      fbAuth.onAuthStateChanged((User) => {
        if (User && User.emailVerified) {
          fbFirestore
            .collection("Users")
            .doc(User.uid)
            .get()
            .then((res) => {
              commit("setCurrentUser", res.data());
              resolve(res.data());
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        } else {
          commit("setCurrentUser", null);
          resolve("no User");
        }
      });
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
  currentUser: (state) => {
    return state.current_user;
  },
  loginLoading: (state) => {
    return state.Loadings.login;
  },
  registerLoading: (state) => {
    return state.Loadings.register;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
