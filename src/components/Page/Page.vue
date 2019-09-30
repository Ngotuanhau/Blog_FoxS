<template>
  <v-container fluid>
    <v-layout v-if="page" class="page">
      <v-flex class="page-title">
        <span>{{page.title}}</span>
      </v-flex>
      <v-flex class="page-date">
        <span>{{page.created_at | moment("from", "now") }}</span>
      </v-flex>
      <v-flex class="page-content body-1">
        <div>
          <span v-html="page.content"></span>
        </div>
        <div>
          <span>Theo: {{page.metadata.authors.title}}</span>
        </div>
      </v-flex>
    </v-layout>
    <v-layout column mt-5>
      <v-flex class="page-related">
        <span class="page-related__title">Bài viết liên quan</span>
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
                <v-card width="100%" class="card">
                  <router-link :to="'/page/'+ item.slug">
                    <v-img
                      :src="item.metadata.image.url"
                      alt="hinhanh"
                      height="300"
                      class="card-img"
                    >
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

<style lang="scss" >
@import "../../styles/main.scss";

.page {
  display: block;
  font-family: Arial, Helvetica, sans-serif;

  .page-title {
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 1px;
  }

  .page-date {
    text-align: left;
    margin: 20px 0;
    color: $cl-date;
  }

  .page-content {
    text-align: left;

    img {
      max-width: 100%;
      max-height: 350px;
    }
  }
}

.page-related {
  display: flex;
  border-bottom: 2px solid $cl-main;
  font-family: Arial, Helvetica, sans-serif;

  .page-related__title {
    background-color: $cl-main;
    color: $cl-text-main;
    padding: 3px 5px;
  }
}

.card-img {
  border-radius: 5px;

  .card-title {
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: $cl-bg-title-posts;

    .card-title__text {
      color: $cl-text;
      text-align: left;
      word-break: initial;
    }
  }
}

.v-data-footer__pagination {
  display: none;
}

.v-select {
  margin: 13px 0 13px 20px !important;
}
</style>


