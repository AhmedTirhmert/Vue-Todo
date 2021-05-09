import Vue from "vue";
import { fbFirestore } from "../firebase";
// Global Variables
//where the auth data goes
const state = {
  newTodo: {
    loading: false,
    error: null,
  },
  deleteTodo: {
    success: false,
  },
  listTodos: {},
  recentTodos: {},
};
//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {
  setListTodos(state, payload) {
    Vue.set(state.listTodos, payload.todoId, payload);
  },
  resetListTodos(state) {
    state.listTodos = {};
  },
  setRecentTodos(state, payload) {
    Vue.set(state.recentTodos, payload.todoId, payload);
  },
  resetRecentTodos(state) {
    state.recentTodos = {};
  },
  setNewTodoLoading(state, payload) {
    Vue.set(state.newTodo, "loading", payload);
  },
  setNewTodoError(state, payload) {
    Vue.set(state.newTodo, "error", payload);
  },
  removeTodoById(state, todoId) {
    if (state.listTodos[todoId]) {
      Vue.delete(state.listTodos, todoId);
    }
    if (state.recentTodos[todoId]) {
      Vue.delete(state.recentTodos, todoId);
    }
  },
  setDeleteTodoSuccess(state, payload) {
    Vue.set(state.deleteTodo, "success", payload);
  },
};
//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  getListTodos({ commit }, listId) {
    commit("resetListTodos");
    let ListTodosRef = fbFirestore
      .collection("Todos")
      .where("listId", "==", listId)
      .where("done", "==", false)
      .orderBy("createdAt", "desc");
    ListTodosRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        commit("setListTodos", doc.data());
      });
      querySnapshot.docChanges().forEach((change) => {
        if (change.type == "removed") {
          commit("removeTodoById", change.doc.id);
        }
      });
    });
  },
  addTodo({ commit, rootState }, payload) {
    commit("setNewTodoLoading", true);
    let newTodoRef = fbFirestore.collection("Todos").doc();
    let newTodoId = newTodoRef.id;
    newTodoRef
      .set({
        todoId: newTodoId,
        content: payload.content,
        done: false,
        listId: payload.listId,
        userId: rootState.auth.currentUser.user_id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
      .then(() => {
        commit("setNewTodoLoading", false);
      })
      .catch((error) => {
        commit("setNewTodoError", error.message);

        commit("setNewTodoLoading", false);
      });
  },
  editTodoById(context, payload) {
    let todoRef = fbFirestore.collection("Todos").doc(payload.todoId);
    todoRef.update({
      content: payload.todoContent,
      updatedAt: Date.now(),
    });
  },
  todoDoneById(context, payload) {
    let doneTodoRef = fbFirestore.collection("Todos").doc(payload);

    doneTodoRef.update({
      done: true,
      updatedAt: Date.now(),
    });
  },
  getUserRecentTodos({ commit, rootState }) {
    let recentTodosRef = fbFirestore
      .collection("Todos")
      .where("userId", "==", rootState.auth.currentUser.user_id)
      .where("done", "==", false)
      .orderBy("createdAt", "desc")
      .limit(10);

    recentTodosRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        commit("setRecentTodos", doc.data());
      });
      querySnapshot.docChanges().forEach((change) => {
        if (change.type == "removed") {
          commit("removeTodoById", change.doc.id);
        }
      });
    });
  },
  deleteTodoById({ commit }, todoId) {
    let deleteTodoRef = fbFirestore.collection("Todos").doc(todoId);
    deleteTodoRef
      .delete()
      .then(() => {
        commit("setDeleteTodoSuccess", true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
};
//methods to get data from state object and make availible in vue components
const getters = {
  listTodos: (state) => {
    return state.listTodos;
  },
  userRecentTodos: (state) => {
    return state.recentTodos;
  },
  getTodoById: (state) => (todoId) => {
    return state.listTodos[todoId]
      ? state.listTodos[todoId]
      : state.recentTodos[todoId];
  },
  deleteTodoSuccess: (state) => {
    return state.deleteTodo.success;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
