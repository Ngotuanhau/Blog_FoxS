<template>
  <v-layout class="home">
    <v-flex>
      <ContainerPosts />
    </v-flex>
  </v-layout>
</template>

<script>
import ContainerPosts from "./Posts/ContainerPosts";

export default {
  name: "home",
  components: {
    ContainerPosts
  }
};
</script>