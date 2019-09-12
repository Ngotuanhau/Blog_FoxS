<template>
  <v-carousel hide-delimiters cycle show-arrows-on-hover>
    <v-carousel-item v-for="(item, index) in sliderImage" :key="index" :src="item.url"></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      sliderImage: []
    };
  },

  mounted() {
    this.getSlideImage();
  },

  methods: {
    getSlideImage() {
      axios.get("/media?folder=slider-image").then(response => {
        this.sliderImage = response.data.media;
        console.log(this.sliderImage);
      });
    }
  }
};
</script>

<style>
</style>