<template>
  <div>
    <a href="#" v-on:click.prevent="showDropDown = !showDropDown">
      <div>Catness</div>
      <img src="..." alt="avatar" />
      <i
        :class="{ 'fa-caret-up': showDropDown, 'fa-caret-down': !showDropDown }"
        class="fa"
        aria-hidden="true"
      ></i>
    </a>
    <div v-if="showDropDown">
      <ul class="menu list pl0 pa0 ma0">
        <li>
          <a href="#" class="dd-link pointer hover-bg-moon-gray">Profile</a>
          <a href="#" class="dd-link pointer hover-bg-moon-gray">SignOut</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>