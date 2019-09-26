<template>
  <v-app-bar app>
    <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="$emit('toogle')"></v-app-bar-nav-icon>
    <v-toolbar-title class="c-toolbar-title">
      <router-link class="c-text" to="/">
        <span class="font-weight-medium display-2 pr-4">FOXS</span>
      </router-link>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../styles/main.scss";

.c-toolbar-title {
  margin: auto;
  padding-left: 0 !important;

  .c-text {
    text-decoration: none;
    color: $cl-text;
  }
}
</style>
