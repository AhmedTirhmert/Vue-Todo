import Vue from "vue";
import { fbFirestore, fb_firestore } from "@/firebase";
// Global Variables
let listsListener
let dashboardListsListener
//State
const state = {
  lists: [],
  recentLists: [],
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
  ADD_USER_LIST(state, list) {
    state.lists.unshift({ ...list })
  },
  RESET_LISTS(state) {
    state.lists = [];
    //lists should be an Array
  },
  REMOVE_USER_LIST(state, listId) {
    Vue.delete(state.lists, state.lists.findIndex(list => list.listId == listId));
  },
  UPDATE_USER_LIST(state, updatedList) {
    Vue.set(state.lists, state.lists.findIndex(list => list.listId == updatedList.listId), updatedList)
  }
};
//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  getUserLists({ commit, rootState }) {
    listsListener = fbFirestore
      .collection("Lists")
      .where("authorId", "==", rootState.auth.currentUser.user_id)
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            commit("ADD_USER_LIST", change.doc.data());
          }
          if (change.type === "removed") {
            commit("REMOVE_USER_LIST", change.doc.data().listId);
          }
          if (change.type === "modified") {
            commit("UPDATE_USER_LIST", change.doc.data());
          }
        });
      });
  },
  getDashboardLists({ commit, rootState }) {
    dashboardListsListener = fbFirestore
      .collection("Lists")
      .where("authorId", "==", rootState.auth.currentUser.user_id)
      .limit(2)
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            commit("ADD_USER_LIST", change.doc.data());
          }
          if (change.type === "removed") {
            commit("REMOVE_USER_LIST", change.doc.data().listId);
          }
          if (change.type === "modified") {
            commit("UPDATE_USER_LIST", change.doc.data());
          }
        });
      });
  },
  killDashboardListsListener() {
    console.log("WE KILLING IT");
    dashboardListsListener()
  },
  killListsListener() {
    console.log('Destroying LISTENER');
    listsListener()
  },
  resetLists({ commit }) {
    commit('RESET_LISTS')
  },
  async checkListExistance({ rootState }, title) {
    const res = await fbFirestore.collection("Lists")
      .where("title", "==", title)
      .where("authorId", "==", rootState.auth.currentUser.user_id)
      .get()
    return res.empty
  },
  async createList({ dispatch, rootState }, title) {
    const listnotExist = await dispatch('checkListExistance', title)
    if (listnotExist) {
      const newListRef = fbFirestore.collection("Lists").doc();
      const listId = newListRef.id;
      newListRef.set({
        authorId: rootState.auth.currentUser.user_id,
        listId: listId,
        title: title,
        created_at: fb_firestore.FieldValue.serverTimestamp(),
        updated_at: fb_firestore.FieldValue.serverTimestamp()
      })
    } else {
      throw new Error('List already exixte')
    }
  },
  async updateListById({ dispatch }, { listId, title }) {
    const listnotExist = await dispatch('checkListExistance', title)
    if (listnotExist) {
      const updatedList = fbFirestore.collection('Lists').doc(listId)
      await updatedList.update({
        title: title,
        updated_at: fb_firestore.FieldValue.serverTimestamp(),
      })
    } else {
      throw new Error('List title already taken 🤷‍♂️')
    }

  },
  async deleteListById(_, listId) {
    const deleteListByIdRef = fbFirestore.collection("Lists").doc(listId);
    const deletedListTodosRef = fbFirestore
      .collection("Todos")
      .where("listId", "==", listId);
    await deleteListByIdRef.get().then((doc) => {
      if (doc.exists) {
        deleteListByIdRef
          .delete()
          .then(() => {
            deletedListTodosRef.get().then((docs) => {
              docs.forEach((doc) => {
                if (doc.exists) {
                  fbFirestore.doc(doc.ref.path).delete();
                  console.log('TODO DELETED');
                }
              });
              console.log("ALL TODOS DELETED");
            });
          })
          .catch((error) => {
            throw new Error(error.message)
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
  dashboardUserLists: (state) => {
    let listsKeys = Object.keys(state.lists);
    let res = {};
    if (state.lists[listsKeys[0]]) {
      Vue.set(res, listsKeys[0], state.lists[listsKeys[0]]);
    }
    if (state.lists[listsKeys[1]]) {
      Vue.set(res, listsKeys[1], state.lists[listsKeys[1]]);
    }

    return res;
  },
  getListById: (state) => (listId) => {
    return state.lists[state.lists.findIndex(list => list.listId == listId)];
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
  userRecentLists: state => {
    let recentTodos = []
    if (state.lists[0]) {
      recentTodos.push(state.lists[0])
    }
    if (state.lists[1]) {
      recentTodos.push(state.lists[1])
    }
    return recentTodos
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
