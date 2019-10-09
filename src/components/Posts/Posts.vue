<template>
  <v-container fluid grid-list-md>
    <v-data-iterator :items="posts">
      <template v-slot:default="props">
        <v-layout wrap>
          <v-flex d-flex xs12 sm12 md6 v-for="item in props.items" :key="item.id" class="pa-2">
            <v-card width="100%" class="card">
              <router-link :to="'/page/'+ item.id">
                <v-img
                  :src="'http://localhost:1337' + item.image[0].url"
                  alt="hinhanh"
                  height="300"
                  class="card-img"
                >
                  <v-card-title class="card-title">
                    <span class="overline card-title__text">{{item.name}}</span>
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
import gql from "graphql-tag";

export default {
  watch: {
    posts(val) {
      console.log(val);
    }
  },

  apollo: {
    posts: gql`
      query {
        posts(sort: "created_at:desc") {
          id
          name
          slug
          categories {
            name
          }
          image {
            url
          }
        }
      }
    `
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