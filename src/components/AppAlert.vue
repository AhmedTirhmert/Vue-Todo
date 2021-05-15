<template>
  <div class="alert mb-lg py-md px-md radius-lg" :class="`alert-${type}`">
    <span> {{ message }}</span>
  </div>
</template>


<script>
export default {
  name: "AppAlert",
  props: {
    message: null,
    type: null,
  },
};
</script>
<style scoped>
@import url("../assets/css/app-alert.css");
</style>

