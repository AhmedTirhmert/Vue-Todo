import { fbFirestore } from "@/firebase";
// Global Variables
let listTodosListener, dashboardTodosListener

//where the auth data goes
const state = {
  listTodos: [],
  recentTodos: [],
};
//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {
  ADD_TODO(state, list) {
    state.listTodos.unshift(list);
  },
  REMOVE_TODO(state, todoId) {
    state.listTodos.splice(state.listTodos.findIndex((todo) => todo.todoId == todoId), 1)
  },
  UPDATE_TODO(state, todo) {
    state.listTodos[state.listTodos.findIndex((list) => list.listId == todo.listId)] = { ...todo }
  },
  RESET_LIST_TODOS(state) {
    state.listTodos = [];
  },
  ADD_DASHBOARD_TODO(state, todo) {
    state.recentTodos.unshift({ ...todo });
  },
  REMOVE_DASHBOARD_TODO(state, todoId) {
    state.recentTodos.splice(state.recentTodos.findIndex((todo) => todo.todoId == todoId), 1)
  },
  UPDATE_DASHBOARD_TODO(state, todo) {
    state.recentTodos[state.recentTodos.findIndex((list) => list.listId == todo.listId)] = { ...todo }
  },
  RESET_DASHBOARD_TODOS(state) {
    state.recentTodos = [];
  },
};
//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  getListTodos({ commit }, listId) {
    listTodosListener = fbFirestore
      .collection("Todos")
      .where("listId", "==", listId)
      .where("done", "==", false)
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "removed") {
            console.log("Remeving Todo => ", change.doc.id);
            commit("REMOVE_TODO", change.doc.id);
          }
          if (change.type === "added") {
            commit("ADD_TODO", change.doc.data());
          }
          if (change.type === "modified") {
            commit("UPDATE_TODO", change.doc.data());
          }
        });
      });
  },
  killListTodosListener() {
    console.log("killing the Listener");
    listTodosListener()
  },
  async getTodoByContent(_, { listId, content }) {
    const newTodoExistanceCheck = fbFirestore
      .collection("Todos")
      .where("content", "==", content)
      .where("listId", "==", listId);
    const todoExist = await newTodoExistanceCheck.get()
    return todoExist.docs[0].data()
  },
  async checkTodoExistence(_, { listId, content }) {
    const newTodoExistanceCheck = fbFirestore
      .collection("Todos")
      .where("content", "==", content)
      .where("listId", "==", listId);
    const todoExist = await newTodoExistanceCheck.get()
    return todoExist.empty
  },
  async addNewTodo({ rootState, dispatch }, { listId, content }) {
    const newTodoRef = fbFirestore.collection("Todos").doc();
    const newTodoId = newTodoRef.id;
    const isNewTodo = await dispatch('checkTodoExistence', { listId: listId, content: content })
    if (isNewTodo) {
      await newTodoRef.set({
        todoId: newTodoId,
        content: content,
        done: false,
        listId: listId,
        userId: rootState.auth.currentUser.user_id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    } else {
      const existingTodo = await dispatch('getTodoByContent', { listId: listId, content: content })
      if (existingTodo.done) {
        throw { message: 'Todo Already Marked Done ✔️', todoId: existingTodo.todoId }
      }
      throw new Error('Todo Existe Within The Current List 🤷‍♂️')
    }
  },
  editTodoById(_, { todoId, content }) {
    let todoRef = fbFirestore.collection("Todos").doc(todoId);
    todoRef.update({
      content: content,
      updatedAt: Date.now(),
    });
  },
  async todoDoneById(_, { todoId }) {
    console.log(todoId);
    let doneTodoRef = fbFirestore.collection("Todos").doc(todoId);
    await doneTodoRef.update({
      done: true,
      updatedAt: Date.now(),
    });
  },
  async undoneTodoById(_, { todoId }) {
    let doneTodoRef = fbFirestore.collection("Todos").doc(todoId);
    console.log(doneTodoRef);
    await doneTodoRef.update({
      done: false,
      updatedAt: Date.now(),
    });
  },
  resetListTodos({ commit }) {
    commit('RESET_LIST_TODOS')
  },
  getDashboardTodos({ commit, rootState }) {
    dashboardTodosListener = fbFirestore
      .collection("Todos")
      .where("userId", "==", rootState.auth.currentUser.user_id)
      .where("done", "==", false)
      .orderBy("createdAt", "desc")
      .limit(10)
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "removed") {
            commit("REMOVE_DASHBOARD_TODO", change.doc.id);
          }
          if (change.type === "added") {
            commit("ADD_DASHBOARD_TODO", change.doc.data());
          }
          if (change.type === "modified") {
            commit("UPDATE_DASHBOARD_TODO", change.doc.data());
          }
        });
      });

  },
  killDashboardTodosListener() {
    console.log("KILLING DASHBOARD TODOS LISTENER");
    dashboardTodosListener()
  },
  resetDashboardTodos({ commit }) {
    commit('RESET_DASHBOARD_TODOS')
  },
  async deleteTodoById(_, { todoId }) {
    const deleteTodoRef = fbFirestore.collection("Todos").doc(todoId)
    await deleteTodoRef.delete()
  },
};
//methods to get data from state object and make availible in vue components
const getters = {
  listTodos: (state) => {
    return state.listTodos;
  },
  dashboardTodos: (state) => {
    return state.recentTodos;
  },
  getListTodoById: (state) => (todoId) => {
    return state.listTodos[state.listTodos.findIndex((todo) => todo.todoId == todoId)];
  },
  getDashboardTodoById: (state) => (todoId) => {
    return state.recentTodos[state.recentTodos.findIndex((todo) => todo.todoId == todoId)];
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
