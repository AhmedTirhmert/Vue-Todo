import Vue from "vue";
import { sha256 } from "js-sha256";
import { fbStorage, fbAuth, fbFirestore } from "@/firebase";
// Global Variables
//where the auth data goes
const state = {
  loading: false,
  profileAlert: {
    type: null,
    message: null,
  },
};
//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {
  setLoading(state, payload) {
    Vue.set(state, "loading", payload);
  },
  setError(state, payload) {
    Vue.set(state.profileAlert, "type", payload.type);
    Vue.set(state.profileAlert, "message", payload.message);
  },
  resetError(state) {
    Vue.set(state.profileAlert, "type", null);
    Vue.set(state.profileAlert, "message", null);
  },
};
//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  updateProfilePicture({ commit, rootState }, picture) {
    return new Promise((resolve, reject) => {
      if (picture) {
        let pictureName = `${rootState.auth.currentUser.user_id}_${Date.now()}`;
        fbStorage
          .ref(`ProfilePictures/${pictureName}`)
          .put(picture)
          .then((res) => {
            res.ref
              .getDownloadURL()
              .then((url) => {
                resolve(url);
              })
              .catch((error) => {
                reject(error.message);
                commit("setError", {
                  message: error.message,
                  type: "danger",
                });
              });
          })
          .catch((error) => {
            console.error(error);
            reject(error.message);
          });
      } else {
        resolve(rootState.auth.currentUser.picture);
      }
    });
  },
  updateProfilePassword({ rootState }, password) {
    console.log("Heres the update password => ", password);
    return new Promise((resolve, reject) => {
      if (password) {
        let User = fbAuth.currentUser;
        User.updatePassword(password)
          .then(() => {
            resolve(sha256(password));
          })
          .catch((error) => {
            console.error(error);
            reject(error.message);
          });
      } else {
        resolve(rootState.auth.currentUser.password);
      }
    });
  },
  updateProfileEmail({ rootState }, email) {
    return new Promise((resolve, reject) => {
      if (email != rootState.auth.currentUser.email) {
        let User = fbAuth.currentUser;
        console.log("Old Email", User.email);
        User.updateEmail(email)
          .then(() => {
            console.log("New Email", User.email);
            let actionCodeSettings = {
              url: `${process.env.VUE_APP_HOST_NAME}/login/?email=${email}`,
            };
            User.sendEmailVerification(actionCodeSettings);
            resolve(email);
          })
          .catch((error) => {
            console.error(error);

            reject(error.message);
          });
      } else {
        resolve(rootState.auth.currentUser.email);
      }
    });
  },
  updateProfileInfos({ commit, rootState, dispatch }, payload) {
    commit("setLoading", true);
    // console.log("Payload => ", payload);
    // console.log("veuX  => ", rootState.auth.currentUser);
    if (sha256(payload.password) == rootState.auth.currentUser.password) {
      dispatch("updateProfilePicture", payload.picture)
        .then((url) => {
          dispatch("updateProfilePassword", payload.newPassword)
            .then((newPassword) => {
              dispatch("updateProfileEmail", payload.email)
                .then((newEmail) => {
                  fbFirestore
                    .collection("Users")
                    .doc(rootState.auth.currentUser.user_id)
                    .update({
                      fullName: payload.fullName,
                      email: newEmail,
                      picture: url,
                      updated_at: Date.now(),
                      password: newPassword,
                    })
                    .then(() => {
                      commit("setError", {
                        message: "Credentials Updated Successfully",
                        type: "success",
                      });
                      commit("setLoading", false);
                    });
                })
                .catch((error) => {
                  console.error(error);

                  commit("setError", {
                    message: error,
                    type: "danger",
                  });
                  commit("setLoading", false);
                });
            })
            .catch((error) => {
              console.error(error);

              commit("setError", {
                message: error,
                type: "danger",
              });
              commit("setLoading", false);
            });
        })
        .catch((error) => {
          console.error(error);

          commit("setError", {
            message: error,
            type: "danger",
          });
          commit("setLoading", false);
        });
    } else {
      commit("setError", {
        message: "Incorrect Password",
        type: "danger",
      });
      commit("setLoading", false);
    }
  },
};
//methods to get data from state object and make availible in vue components
const getters = {
  profileError: (state) => {
    return state.profileAlert;
  },
  profileLoading: (state) => {
    return state.loading;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
