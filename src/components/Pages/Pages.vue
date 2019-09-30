<template>
  <v-container fluid>
    <v-layout v-for="(item, index) in pages" :key="index" pa-2>
      <v-card class="card">
        <v-row class="pa-3" no-gutters>
          <v-col cols="12" md="6" sm="6" class="shrink py-0">
            <router-link :to="'/page/'+ item.slug">
              <v-img :src="item.metadata.image.url" aspect-ratio="1.75" class="card-img"></v-img>
            </router-link>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-container class="pa-2">
              <v-row no-gutters>
                <v-col class="py-0">
                  <v-card-title class="card-title px-2">
                    <div style="width: 100%">
                      <router-link :to="'/page/'+ item.slug" class="card-title__text">{{item.title}}</router-link>
                    </div>
                    <span
                      class="card-title__date subtitle-2"
                    >{{item.created_at | moment("from", "now") }}</span>
                    <span
                      v-html="item.metadata.description"
                      class="card-title__descrip text-truncate subtitle-2"
                    ></span>
                  </v-card-title>
                  <v-card-actions class="card-actions">
                    <v-btn text class="card-actions__read" :to="'/page/'+ item.slug">
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
export default {
  data() {
    return {
      pages: []
    };
  },

  watch: {
    $route(val) {
      this.getPages();
    }
  },

  mounted() {
    this.getPages();
  },

  methods: {
    getPages() {
      axios.get(`/objects?type=${this.$route.params.slug}`).then(response => {
        this.pages = response.data.objects;
        console.log(this.pages);
      });
    },

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