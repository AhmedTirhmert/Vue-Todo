<template>
  <section class="">
    <h2 class="color--heading1 mb-md">Profile</h2>
    <div class="profile-section radius-sm py-lg px-lg">
      <div class="profile-input-container">
        <label>Full Name</label>
        <input type="text" class="profile-input" value="Ahmed Tirhmert" />
      </div>
      <div class="profile-input-container">
        <label>Email</label>
        <input
          type="text"
          class="profile-input"
          value="Ahmedtirhmert@gmail.com"
        />
      </div>

      <div class="profile-input-container">
        <label>Picture</label>
        <input type="file" class="profile-file-input" id="profile-picture" />
        <label for="profile-picture">Profile Picture </label>
      </div>
      <div class="profile-input-container">
        <label>Password</label>
        <input type="password" class="profile-input" />
      </div>
      <div class="profile-input-container">
        <label>New Password</label>
        <input type="password" class="profile-input" />
      </div>
      <button
        class="btn profile-btn py-sm radius-lg"
        ref="btn"
        @click="$refs.modalName.openModal()"
      >
        Save Changes
      </button>
    </div>
    <delete-modal ref="modalName">
      <template v-slot:header>
        <h1>Delete Note</h1>
      </template>
      <template v-slot:sub-header>
        <h1>
          Are you sure you want to delete
          <span class="color--danger">Hello</span>
        </h1>
      </template>
      <template v-slot:footer>
        <button class="cancel" @click="$refs.modalName.closeModal()">
          Cancel
        </button>
        <button class="accept" @click="$refs.modalName.closeModal()">
          Yes
        </button>
      </template>
    </delete-modal>
  </section>
</template>


<script>
export default {
  name: "Profile",
  components: {
    deleteModal: () => import("../components/deleteModal"),
  },
  methods: {
    openUp() {
      console.log(this.$refs.modalName);
    },
  },
  filters: {},
  data: function () {
    return {
      showModal: false,
    };
  },
  mounted() {},
};
</script>


<style scoped>
@import url("../style/Profile.css");
</style>

