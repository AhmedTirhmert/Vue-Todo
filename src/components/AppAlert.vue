<template>
  <div class="alert mb-lg py-md px-md radius-lg" :class="`alert-${type}`">
    <span class=""> {{ message }}</span>
    <!-- <button class="alert-btn" @click="$emit('close')">
      <span aria-hidden="true">&times;</span>
    </button> -->
  </div>
</template>


<script>
export default {
  name: "AppAlert",
  props: {
    message: null,
    type: null,
  },

  methods: {},
  filters: {},
  data: function () {
    return {};
  },
  mounted() {},
};
</script>


<style scoped>
.alert {
  color: #b0b0b9;
  background-color: #fefefe;
  border-color: #7c7c7c;
  display: flex;
  justify-content: space-between;
  filter: drop-shadow(0px 5px 1px rgba(0, 0, 0, 0.2));
  transition: width 2s;
}
.alert span {
  font-size: 0.8rem;
}
.alert button {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}
.alert button span {
  font-size: 1.3rem;
  line-height: 0.5;
}
.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}
.alert-warning {
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
}
</style>

