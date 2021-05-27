<!-- @format -->

<template>
  <div
    v-if="localMessage"
    class="alert mb-lg py-md px-md radius-lg"
    :class="`alert-${type}`"
  >
    <span> {{ localMessage }}</span>
  </div>
</template>

<script>
export default {
  name: "AppAlert",
  props: {
    message: null,
    type: null,
    autoDisappear: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      localMessage: null,
    };
  },
  mounted() {},
  watch: {
    message() {
      this.localMessage = this.message;
      if (this.message && this.autoDisappear) {
        setTimeout(() => {
          this.localMessage = null;
        }, this.delay * 1000);
      }
    },
  },
};
</script>
<style scoped>
@import url("../assets/css/app-alert.css");
</style>
