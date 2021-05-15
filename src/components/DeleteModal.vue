<template >
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal-backdrop" @click="modalBackdropClose()" />
      <div class="modal-dialog">
        <div class="modal-header">
          <slot name="header" />
        </div>
        <div class="modal-sub-header mb-lg">
          <slot name="sub-header" />
        </div>

        <div class="modal-body">
          <span v-if="!success" class="radius-xl trash-icon"
            ><i class="fas fa-trash"></i
          ></span>
          <span v-else class="radius-xl check-icon"
            ><i class="fas fa-check"></i
          ></span>
        </div>

        <div class="modal-footer">
          <slot v-if="!success" name="footer" />
          <div v-else>
            <button class="cancel" @click="$emit('closeModal')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    success: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      trash: true,
    };
  },
  methods: {
    modalBackdropClose() {
      this.$emit("modalBackdropClose");
      this.closeModal;
    },
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
    },
  },
};
</script>


<style scoped>
@import url("../assets/css/delete-modal.css");
</style>
