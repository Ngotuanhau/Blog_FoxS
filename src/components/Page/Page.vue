<template>
  <v-container fluid>
    <v-layout v-if="post" class="page">
      <v-flex class="page-title">
        <span>{{post.name}}</span>
      </v-flex>
      <v-flex class="page-date">
        <span>{{post.created_at | moment("from", "now") }}</span>
      </v-flex>
      <v-flex class="page-content body-1">
        <vue-markdown>{{post.content}}</vue-markdown>
        <div>
          <span>Theo: {{post.authors[0].name}}</span>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import VueMarkdown from "vue-markdown";

export default {
  components: {
    VueMarkdown
  },

  data() {
    return {
      post: ""
    };
  },

  watch: {
    post(val) {
      console.log(val);
    }
  },

  apollo: {
    post: {
      query: gql`
        query post($id: ID!) {
          post(id: $id) {
            id
            name
            categories {
              id
              name
            }
            created_at
            content
            authors {
              name
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
</style>
