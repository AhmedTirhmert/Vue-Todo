// import Vue from "vue";
import moment from 'moment'
import { fbStorage, fbAuth, fb_auth } from "@/firebase";
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

};
//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  pictureUploadTimestamp(_, val) {
    return moment(val).format('MM_DD_YYYY_h_mm_ss');
  },
  async updateProfilePicture({ rootState, dispatch }, picture) {
    try {
      const profilePictureTimestampName = await dispatch("pictureUploadTimestamp", Date.now())
      const profilePictureRef = fbStorage.ref(`ProfilePictures/${rootState.auth.currentUser.user_id}/${profilePictureTimestampName}`)
      const uploadResponse = await profilePictureRef.put(picture)
      return uploadResponse.ref.getDownloadURL()
    } catch (error) {
      throw new Error('Something wrong happend while uploading you picture 🙁! Try again later ⏳')
    }

  },
  async updateProfilePassword({ dispatch }, { currentPassword, newPassword }) {
    await dispatch('reAuthenticateUser', currentPassword)
    const user = fbAuth.currentUser;
    await user.updatePassword(newPassword)


  },
  async updateProfileEmail({ dispatch }, { newEmail, currentPassword }) {
    await dispatch('reAuthenticateUser', currentPassword)
    const user = fbAuth.currentUser;
    const actionCodeSettings = {
      url: `${process.env.VUE_APP_HOST_URI}/login/?email=${newEmail}`,
    };
    await user.updateEmail(newEmail)
    await user.sendEmailVerification(actionCodeSettings);


  },
  async reAuthenticateUser(_, currentPassword) {
    try {
      const user = fbAuth.currentUser;
      const cred = fb_auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      const resp = await user.reauthenticateWithCredential(cred)
      console.log("Reauthenticate response => ", resp);
    } catch (error) {
      throw new Error('Invalid Password')
    }

  },
  async updateUserInfo({ dispatch }, changes) {
    console.log("CHANGES ARE => ", changes);
    const user = fbAuth.currentUser
    if (Object.keys(changes).length == 2) {
      await user.updateProfile({
        displayName: changes.fullName,
        photoURL: changes.profilePictureURL
      })
    } else {
      switch (Object.keys(changes)[0]) {
        case "profilePictureURL":
          await user.updateProfile({
            photoURL: changes.profilePictureURL
          })
          break;
        case "fullName":
          await user.updateProfile({
            displayName: changes.fullName,
          })
          break;
        default:
          break;
      }
    }
    dispatch('auth/reloadCurrentUserInfos', null, { root: true })
  },
  async updateProfileInfos({ dispatch }, { fullName, email, profilePicture, currentPassword, newPassword }) {
    try {
      console.log({ fullName: fullName, email: email, profilrPicture: profilePicture, currentPassword: currentPassword, newPassword: newPassword });
      const changes = {}
      if (profilePicture) {
        changes.profilePictureURL = await dispatch('updateProfilePicture', profilePicture)
      }
      if (await dispatch('isNameUpdated', fullName)) {
        changes.fullName = fullName
      }
      if (await dispatch('isEmailUpdated', email)) {
        await dispatch('updateProfileEmail', { currentPassword: currentPassword, newEmail: email })
      }
      if (await dispatch('isPasswordUpdated', newPassword)) {
        await dispatch('updateProfilePassword', { newPassword: newPassword, currentPassword: currentPassword })
      }
      if (Object.keys(changes).length > 0) {
        await dispatch("updateUserInfo", changes)
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  // UTILITY ACTIONS
  isEmailUpdated({ rootState }, email) {
    if (rootState.auth.currentUser.email !== email) {
      return true
    }
    return false
  },
  isNameUpdated({ rootState }, fullName) {
    if (rootState.auth.currentUser.fullName !== fullName) {
      return true
    }
    return false
  },
  isPasswordUpdated(_, newPassword) {
    if (newPassword) {
      return true
    }
    return false
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
