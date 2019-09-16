<template>
  <v-container fluid>
    <v-layout v-for="(item, index) in page" :key="index" class="c-page">
      <v-flex class="c-page-title">
        <span>{{item.title}}</span>
      </v-flex>
      <v-flex class="c-page-date">
        <span>{{item.created_at | moment("calendar") }}</span>
      </v-flex>
      <v-flex class="c-page-content">
        <div>
          <span v-html="item.content"></span>
        </div>
        <div>
          <span>Theo: {{item.metadata.authors.title}}</span>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      page: []
    };
  },

  mounted() {
    this.getPage();
  },

  methods: {
    getPage() {
      axios.get("/object/" + this.$route.params.slug).then(response => {
        this.page = response.data;
        console.log(this.page);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
  color: #ef5350;
}

.c-page-content {
  text-align: left;
}
</style>
