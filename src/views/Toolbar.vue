<template>
  <v-app-bar>
    <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="$emit('toogle')"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <router-link class="c-text" to="/">
        <span class="font-weight-regular display-1 font-italic px-4">FOXS</span>
      </router-link>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style>
</style>