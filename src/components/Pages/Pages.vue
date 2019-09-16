<template>
  <v-container fluid>
    <v-layout v-for="(item, index) in pages" :key="index" pa-2>
      <v-card class="c-card">
        <v-flex md6>
          <router-link :to="'/page/'+ item.slug">
            <v-img :src="item.metadata.image.url" aspect-ratio="1.75"></v-img>
          </router-link>
        </v-flex>
        <v-flex md6>
          <v-card-title class="c-card-title">
            <router-link :to="'/page/'+ item.slug" class="c-card-text">{{item.title}}</router-link>
            <span class="c-text-date">{{item.created_at | moment("calendar") }}</span>
            <span v-html="item.metadata.description" class="c-text-descrip"></span>
          </v-card-title>
          <v-card-actions>
            <v-btn text class="c-btn-read" :to="'/page/'+ item.slug">
              <span>read more</span>
            </v-btn>
          </v-card-actions>
        </v-flex>
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

<style scoped>
.c-card {
  display: flex;
}
.c-card-text {
  text-decoration: none;
  color: black;
  text-align: left;
  font-size: 20px;
  letter-spacing: 2px;
  word-break: initial;
}
.c-text-date {
  font-size: 15px;
  text-align: left;
  margin: 10px 0;
}
.c-text-descrip {
  color: rgba(0, 0, 0, 0.7);
  font-size: 15px;
  text-align: left;
  word-break: initial;
}
.c-btn-read {
  background-color: #ef5350;
  color: white;
  border-radius: 20px;
  padding: 0 15px !important;
}
</style>