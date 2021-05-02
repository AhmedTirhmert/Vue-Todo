import Vue from "vue";
import { fbFirestore } from "@/firebase";
// Global Variables
const state = {
  lists: {},
  newList: {
    loading: false,
    error: null,
  },
  deleteList: {
    success: null,
  },
};
//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {
  setUserLists(state, payload) {
    Vue.set(state.lists, payload.listId, payload);
  },
  resetUserLists(state) {
    Vue.set(state, "lists", {});
  },
  deleteListById(state, listId) {
    Vue.delete(state.lists, listId);
  },
  setNewListLoading(state, payload) {
    Vue.set(state.newList, "loading", payload);
  },
  setNewListError(state, payload) {
    Vue.set(state.newList, "error", payload);
  },
  setDeleteListSuccess(state, payload) {
    Vue.set(state.deleteList, "success", payload);
  },
};
//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  getUserLists({ commit, rootState }) {
    commit("resetUserLists");
    fbFirestore
      .collection("Lists")
      .where("authorId", "==", rootState.auth.currentUser.user_id)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          commit("setUserLists", doc.data());
        });
        querySnapshot.docChanges().forEach((change) => {
          console.log(change.type);
        });
      });
  },
  addList({ commit, rootState }, title) {
    commit("setNewListLoading", true);
    commit("setNewListError", null);
    fbFirestore
      .collection("Lists")
      .where("title", "==", title)
      .get()
      .then((doc) => {
        console.log("Existing DOC => ", doc);
        if (doc.size == 0) {
          console.log("we are adding the new List ");
          let newListRef = fbFirestore.collection("Lists").doc();
          let listId = newListRef.id;
          newListRef
            .set({
              authorId: rootState.auth.currentUser.user_id,
              listId: listId,
              title: title,
              created_at: Date.now(),
              updated_at: Date.now(),
            })
            .then(() => {
              // console.log("Snapshot => ", Snapshot.data());
              commit("setNewListLoading", false);
            })
            .catch((error) => {
              console.log(error.message);
              commit("setNewListLoading", false);
            });
        } else {
          console.log("we are throwing an error for adding the new List ");
          commit("setNewListLoading", false);
          commit("setNewListError", "List Already Existes");
        }
      });
  },
  updateListById({ state }, payload) {
    if (payload.title.trim() != state.lists[payload.listId].title) {
      const updatedListRef = fbFirestore
        .collection("Lists")
        .doc(payload.listId);
      updatedListRef.update({
        title: payload.title,
        updated_at: Date.now(),
      });
    }
  },
  deleteListById({ commit, dispatch }, listId) {
    console.log(listId);
    const deleteListById = fbFirestore.collection("Lists").doc(listId);
    deleteListById.get().then((doc) => {
      if (doc.exists) {
        deleteListById
          .delete()
          .then(() => {
            commit("deleteListById", listId);

            dispatch("getUserLists");
            commit("setDeleteListSuccess", true);

            console.log("Deleted Successfully => ", listId);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    });
  },
};
//methods to get data from state object and make availible in vue components
const getters = {
  userLists: (state) => {
    return state.lists;
  },
  getListById: (state) => (listId) => {
    return state.lists[listId];
  },
  addListLoading: (state) => {
    return state.newList.loading;
  },
  addListError: (state) => {
    return state.newList.error;
  },
  deleteListSuccess: (state) => {
    return state.deleteList.success;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
