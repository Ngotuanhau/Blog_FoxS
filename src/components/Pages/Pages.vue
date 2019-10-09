<template>
  <v-container fluid>
    <v-layout v-for="item in category.posts" :key="item.id" pa-2>
      <v-card class="card">
        <v-row class="pa-3" no-gutters>
          <v-col cols="12" md="6" sm="6" class="shrink py-0">
            <router-link :to="{name:'page', params:{id:item.id}}">
              <v-img
                :src="'http://localhost:1337' + item.image[0].url"
                aspect-ratio="1.75"
                class="card-img"
              ></v-img>
            </router-link>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-container class="pa-2">
              <v-row no-gutters>
                <v-col class="py-0">
                  <v-card-title class="card-title px-2">
                    <div style="width: 100%">
                      <router-link
                        :to="{name:'page', params:{id:item.id}}"
                        class="card-title__text"
                      >{{item.name}}</router-link>
                    </div>
                    <span
                      class="card-title__date subtitle-2"
                    >{{item.created_at | moment("from", "now") }}</span>
                    <span v-html="item.title" class="card-title__descrip text-truncate subtitle-2"></span>
                  </v-card-title>
                  <v-card-actions class="card-actions">
                    <v-btn text class="card-actions__read" :to="{name:'page', params:{id:item.id}}">
                      <span>read more</span>
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "vue-moment";
import gql from "graphql-tag";

export default {
  data() {
    return {
      category: ""
    };
  },

  watch: {
    category(val) {
      console.log(val);
    }
  },

  apollo: {
    category: {
      query: gql`
        query category($id: ID!) {
          category(id: $id) {
            name
            posts(sort: "created_at:desc") {
              id
              name
              title
              slug
              created_at
              image {
                url
              }
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },

  methods: {
    getDate() {
      return moment();
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../styles/main.scss";

.card {
  max-width: 100%;

  .card-img {
    min-height: 100%;
  }

  .card-title {
    text-align: left;
    word-break: initial;

    .card-title__text {
      text-decoration: none;
      color: $cl-text;
      font-size: 20px;
      letter-spacing: 1px;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 600;
    }

    .card-title__date {
      margin: 20px 0;
    }

    .card-title__descrip {
      color: $cl-text-description;
      height: 50px;
    }
  }

  .card-actions__read {
    background-color: $cl-bg-btn;
    color: $cl-text-btn;
    border-radius: 20px;
    padding: 0 15px !important;
    position: absolute;
    bottom: 15px;
  }
}
</style>