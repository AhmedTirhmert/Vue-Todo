<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal-backdrop" @click="closeModal()" />
      <div class="modal-dialog">
        <div class="modal-header">
          <slot name="header" />
        </div>
        <div class="modal-sub-header mb-lg">
          <slot name="sub-header" />
        </div>

        <div class="modal-body">
          <span v-if="trash" class="radius-xl trash-icon"
            ><i class="fas fa-trash"></i
          ></span>
          <span v-else class="radius-xl check-icon"
            ><i class="fas fa-check"></i
          ></span>
        </div>

        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      show: false,
      trash: true,
    };
  },
  methods: {
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


<style  >
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}
.modal-dialog {
  position: relative;
  width: 600px;
  background-color: #ffffff;
  border-radius: 1em;
  margin: 8rem auto;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.modal-close {
  width: 30px;
  height: 30px;
}
.modal-header {
  text-align: center;
  padding: 20px 20px 10px;
  font-size: 1.7rem;
}
.modal-body {
  padding: 10px 20px 10px;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}
.trash-icon {
  border: 5px solid #ff4d4d;
  padding: 2.5rem 3rem;
}
.trash-icon > i {
  color: rgba(255, 33, 33, 0.8);
  font-size: 7rem;
}
.check-icon {
  border: 5px solid var(--primaryColor);
  padding: 3rem 3rem;
}
.check-icon > i {
  color: var(--primaryColor);
  font-size: 7rem;
}

.modal-footer {
  padding: 10px 20px 20px;
  display: flex;
  cursor: poniter;
  justify-content: space-evenly;
}
.modal-footer button {
  padding: auto;
  border-radius: 2rem;
  width: 15rem;
  height: 3rem;
  border: none;
  filter: drop-shadow(0px 1px 12px rgba(0, 0, 0, 0.1));
  font-family: var(--ubuntu);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: white;
  outline: none;
}
.modal-footer button:hover {
  cursor: pointer;
}
.modal-footer .accept {
  background-color: var(--primaryColor);
}
.modal-footer .cancel {
  background-color: #ff4d4d;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.modal-sub-header {
  text-align: center;
}

@media screen and (max-width: 992px) {
  .modal-dialog {
    width: 90%;
  }
}
@media screen and (max-width: 500px) {
  .modal-footer {
    flex-direction: column;
    gap: 1em;
  }
  .modal-body {
    margin-bottom: 1rem;
  }
  .modal-footer button {
    width: 100%;
  }
  .modal-dialog {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}
</style>
