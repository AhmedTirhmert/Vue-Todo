import Vue from "vue";
import { fbFirestore } from "../firebase";
// Global Variables
//where the auth data goes
const state = {
  newTodo: {
    loading: false,
    error: {
      message: null,
      todoId: null,
    },
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
    Vue.set(state.newTodo.error, "message", payload.message);
    if (payload.todoId) {
      Vue.set(state.newTodo.error, "todoId", payload.todoId);
    } else {
      Vue.set(state.newTodo.error, "todoId", null);
    }
  },
  resetNewTodoError(state) {
    Vue.set(state.newTodo.error, "message", null);
    Vue.set(state.newTodo.error, "todoId", null);
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
    commit("resetNewTodoError");
    let newTodoExistanceCheck = fbFirestore
      .collection("Todos")
      .where("content", "==", payload.content)
      .where("listId", "==", payload.listId);
    let newTodoRef = fbFirestore.collection("Todos").doc();
    let newTodoId = newTodoRef.id;
    newTodoExistanceCheck.get().then((docs) => {
      if (docs.size > 0) {
        let existingTodo = docs.docs[0].data();
        if (existingTodo.done) {
          commit("setNewTodoError", {
            message: "Todo is alreaady done,",
            todoId: existingTodo.todoId,
          });
          commit("setNewTodoLoading", false);
        } else {
          commit("setNewTodoError", {
            message: "Todo is alreaady existe,",
          });
          commit("setNewTodoLoading", false);
        }
      } else {
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
      }
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
  undoneTodoById({ commit }, payload) {
    let doneTodoRef = fbFirestore.collection("Todos").doc(payload);
    doneTodoRef.update({
      done: false,
      updatedAt: Date.now(),
    });
    commit("resetNewTodoError");
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
  addTodoError: (state) => {
    return state.newTodo.error;
  },
  addTodoLoading: (state) => {
    return state.newTodo.loading;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
