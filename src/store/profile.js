import Vue from "vue";
import { fbStorage, fbAuth, fbFirestore, fb_auth } from "@/firebase";
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
  updateProfilePicture({ rootState }, picture) {
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
              });
          })
          .catch((error) => {
            reject(error.message);
          });
      } else {
        resolve(rootState.auth.currentUser.picture);
      }
    });
  },
  updateProfilePassword(conext, password) {
    return new Promise((resolve, reject) => {
      if (password) {
        let User = fbAuth.currentUser;
        User.updatePassword(password)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            console.error(error);
            reject(error.message);
          });
      } else {
        resolve();
      }
    });
  },
  updateProfileEmail({ rootState }, email) {
    return new Promise((resolve, reject) => {
      if (email != rootState.auth.currentUser.email) {
        let User = fbAuth.currentUser;
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
  reauthenticateUser(context, currentPassword) {
    return new Promise((resolve, reject) => {
      let User = fbAuth.currentUser;
      let cred = fb_auth.EmailAuthProvider.credential(
        User.email,
        currentPassword
      );
      User.reauthenticateWithCredential(cred)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject("Incorrect Password");
        });
    });
  },
  updateProfileInfos({ commit, rootState, dispatch }, payload) {
    commit("setLoading", true);
    dispatch("reauthenticateUser", payload.password)
      .then(() => {
        dispatch("updateProfilePicture", payload.picture)
          .then((url) => {
            dispatch("updateProfilePassword", payload.newPassword)
              .then(() => {
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
      })
      .catch((error) => {
        console.error(error);
        commit("setError", {
          message: error,
          type: "danger",
        });
        commit("setLoading", false);
      });
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
