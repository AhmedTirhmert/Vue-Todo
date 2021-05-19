import Vue from "vue";
import router from "@/router";
import { fbAuth } from "@/firebase";
import { fbFirestore } from "@/firebase";
import { fbStorage } from "@/firebase";

// Global Variables
const defaultAvatarURL =
  "https://firebasestorage.googleapis.com/v0/b/todoapp-63f53.appspot.com/o/ProfilePictures%2Favatar.png?alt=media&token=7f21f249-3d97-4467-8062-edca5265fa93";
//where the auth data goes
const state = {
  currentUser: null,
  errors: {
    loginError: null,
    registerError: null,
  },
  loadings: {
    login: false,
    register: false,
  },
};
//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {
  setCurrentUser(state, payload) {
    state.currentUser = payload;
  },
  setLoginError(state, payload) {
    state.errors.loginError = payload;
  },
  setRegisterError(state, payload) {
    Vue.set(state.errors, "registerError", payload);
  },
  setLoginLoading(state, payload) {
    state.loadings.loginLoading = payload;
  },
  setRegisterLoading(state, payload) {
    Vue.set(state.loadings, "register", payload);
  },
};
//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  async uploadFile(_, { filePath, file }) {
    let res = await fbStorage.ref(filePath).put(file);
    return res.ref.getDownloadURL();
  },
  async saveUserInDB(_, { userId, fullName, email, picture }) {
    await fbFirestore
      .collection("Users")
      .doc(userId)
      .set({
        user_id: userId,
        fullName: fullName,
        email: email,
        picture: picture ? picture : defaultAvatarURL,
        created_at: Date.now(),
        uodated_at: Date.now(),
      });
  },
  async sendEmailVerification(_, email) {
    let User = fbAuth.currentUser;
    let actionCodeSettings = {
      url: `${process.env.VUE_APP_HOST_URI}/login/?email=${email}`,
    };
    await User.sendEmailVerification(actionCodeSettings);
  },
  async updateUserInfos(_, { name, pictureURL }) {
    let user = fbAuth.currentUser
    await user.updateProfile({
      displayName: name,
      photoURL: pictureURL
    })
  },

  async registerUser({ dispatch }, { email, password, fullName, profilePicture }) {
    const user = await fbAuth.createUserWithEmailAndPassword(email, password);
    let profilePictureURL;
    if (profilePicture) {
      profilePictureURL = await dispatch("uploadFile", { filePath: `ProfilePictures/${user.user.uid}`, file: profilePicture });
    }
    await dispatch("saveUserInDB", { userId: user.user.uid, fullName: fullName, email: email, picture: profilePictureURL });
    await dispatch('sendEmailVerification', email)
    await dispatch("updateUserInfos", { name: fullName, pictureURL: profilePictureURL })
    fbAuth.signOut()
  },
  async loginUser(_, { email, password }) {
    try {
      const user = await fbAuth.signInWithEmailAndPassword(email, password)
      if (!user.user.emailVerified) {
        throw "You must verify your Email"
      }
      router.push({ name: "Dashboard" })
    } catch (error) {
      fbAuth.signOut()
      if (error.code == 'auth/user-not-found') {
        throw "Email Or Password Incorrect"
      }
      throw error
      
    }
  },
  async logoutUser({ dispatch }) {
    fbAuth.signOut();
    await dispatch("HandleAuthStateChange")
    router.push({ name: "Login" });
  },
  HandleAuthStateChange({ commit }) {
    return new Promise((resolve) => {
      fbAuth.onAuthStateChanged((user) => {
        if (user && user.emailVerified) {
          commit("setCurrentUser", { email: user.email, fullName: user.displayName, picture: user.photoURL });
          resolve()
        } else {
          commit("setCurrentUser", null);
          commit("lists/resetUserLists", null, { root: true });
          commit("todos/resetListTodos", null, { root: true });
          commit("todos/resetRecentTodos", null, { root: true });
          resolve()
        }
      })
    })

  }
};
//methods to get data from state object and make availible in vue components
const getters = {
  loginError: (state) => {
    return state.errors.loginError;
  },
  registerError: (state) => {
    return state.errors.registerError;
  },
  isAuth: (state) => {
    return state.currentUser ? true : false;
  },
  currentUser: (state) => {
    return state.currentUser;
  },
  loginLoading: (state) => {
    return state.loadings.login;
  },
  registerLoading: (state) => {
    return state.loadings.register;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
