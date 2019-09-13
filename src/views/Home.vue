<template>
  <v-layout class="home">
    <v-flex>
      <Slider />
      <ContainerPosts />
    </v-flex>
  </v-layout>
</template>

<script>
import Slider from "../components/Slider/Slider";
import ContainerPosts from "./Posts/ContainerPosts";

export default {
  name: "home",
  components: {
    Slider,
    ContainerPosts
  }
};
</script>