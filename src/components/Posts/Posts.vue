<template>
  <v-container fluid grid-list-md>
    <v-data-iterator :items="posts">
      <template v-slot:default="props">
        <v-layout wrap>
          <v-flex
            d-flex
            xs12
            sm12
            md6
            v-for="(item, index) in props.items"
            :key="index"
            class="pa-2"
          >
            <v-card width="100%" class="card">
              <router-link :to="'/page/'+ item.slug">
                <v-img :src="item.metadata.image.url" alt="hinhanh" height="300" class="card-img">
                  <v-card-title class="card-title">
                    <span class="overline card-title__text">{{item.title}}</span>
                  </v-card-title>
                </v-img>
              </router-link>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      posts: []
    };
  },

  mounted() {
    this.getPosts();
  },

  methods: {
    getPosts() {
      axios.get("/objects").then(response => {
        this.posts = response.data.objects.filter(
          item => item.type_slug !== "authors"
        );
        console.log(this.posts);
      });
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../styles/main.scss";

.card-img {
  border-radius: 5px;

  .card-title {
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: $cl-bg-title-posts;

    .card-title__text {
      text-align: left;
      word-break: initial;
      color: $cl-text;
    }
  }
}
</style>
