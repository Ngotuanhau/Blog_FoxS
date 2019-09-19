<template>
  <v-container fluid>
    <v-layout v-for="(item, index) in pages" :key="index" pa-2>
      <v-card class="c-card">
        <v-row class="pa-3" no-gutters>
          <v-col cols="12" md="6" sm="6" class="shrink py-0">
            <router-link :to="'/page/'+ item.slug">
              <v-img :src="item.metadata.image.url" aspect-ratio="1.75"></v-img>
            </router-link>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-container class="pa-2">
              <v-row no-gutters>
                <v-col class="py-0">
                  <v-card-title class="c-card-title px-2">
                    <div style="width: 100%">
                      <router-link
                        :to="'/page/'+ item.slug"
                        class="c-card-text title"
                      >{{item.title}}</router-link>
                    </div>
                    <span class="c-text-date subtitle-2">{{item.created_at | moment("calendar") }}</span>
                    <span
                      v-html="item.metadata.description"
                      class="c-text-descrip text-truncate subtitle-2"
                    ></span>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn text class="c-btn-read" :to="'/page/'+ item.slug">
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

<style scoped>
.c-card {
  max-width: 100%;
}

.c-card-title {
  text-align: left;
  word-break: initial;
}

.c-card-text {
  text-decoration: none;
  color: black;
  font-size: 20px;
  letter-spacing: 2px;
}

.c-text-date {
  font-size: 15px;
  margin: 20px 0;
}

.c-text-descrip {
  color: rgba(0, 0, 0, 0.7);
  font-size: 15px;
  height: 50px;
}

.c-btn-read {
  background-color: #ef5350;
  color: white;
  border-radius: 20px;
  padding: 0 15px !important;
  position: absolute;
  bottom: 15px;
}
</style>