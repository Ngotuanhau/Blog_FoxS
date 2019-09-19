<template>
  <v-container fluid>
    <v-layout v-if="page" class="c-page">
      <v-flex class="c-page-title">
        <span>{{page.title}}</span>
      </v-flex>
      <v-flex class="c-page-date">
        <span>{{page.created_at | moment("calendar") }}</span>
      </v-flex>
      <v-flex class="c-page-content">
        <div>
          <span v-html="page.content"></span>
        </div>
        <div>
          <span>Theo: {{page.metadata.authors.title}}</span>
        </div>
      </v-flex>
    </v-layout>
    <v-layout column mt-5>
      <v-flex>
        <span class="title c-related">Related posts</span>
      </v-flex>
      <v-container fluid grid-list-md>
        <v-data-iterator
          :items="pages_related"
          :items-per-page.sync="itemsPerPage"
          :footer-props="{ itemsPerPageOptions }"
        >
          <template v-slot:default="props">
            <v-layout wrap>
              <v-flex xs12 sm6 md4 v-for="(item, index) in props.items" :key="index">
                <v-card width="100%" class="c-card">
                  <router-link :to="'/page/'+ item.slug">
                    <v-img :src="item.metadata.image.url" alt="hinhanh" height="300" class="c-img">
                      <v-card-title class="c-title-post">
                        <span class="overline c-text-post">{{item.title}}</span>
                      </v-card-title>
                    </v-img>
                  </router-link>
                </v-card>
              </v-flex>
            </v-layout>
          </template>
        </v-data-iterator>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      page: null,
      pages: [],
      itemsPerPageOptions: [3, 6, 9],
      itemsPerPage: 3
    };
  },

  computed: {
    pages_related() {
      return this.pages.filter(item => item.slug !== this.page.slug);
    }
  },

  mounted() {
    this.getPage();
  },

  methods: {
    getPage() {
      axios.get("/object/" + this.$route.params.slug).then(response => {
        this.page = response.data.object;
        console.log(this.page);
        this.getPages();
      });
    },

    getPages() {
      axios.get(`objects?type=${this.page.type_slug}`).then(response => {
        console.log(response);
        this.pages = response.data.objects;
      });
    }
  },

  watch: {
    $route(val) {
      this.getPage();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

.c-page {
  display: block;
}

.c-page-title {
  font-size: 25px;
  font-weight: 500;
}

.c-page-date {
  text-align: left;
  margin: 20px 0;
  font-size: 15px;
  color: $cl-date;
}

.c-page-content {
  text-align: left;
}

.c-text-post {
  color: $cl-text;
  text-align: left;
}

.c-title-post {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: $cl-bg-title-posts;
}

.c-img {
  border-radius: 5px;
}
</style>
