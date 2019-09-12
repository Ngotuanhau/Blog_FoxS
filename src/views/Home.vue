<template>
  <v-layout class="home">
    <Slider />
  </v-layout>
</template>

<script>
import Slider from "../components/Slider/Slider";

export default {
  name: "home",
  components: {
    Slider
  }
};
</script>