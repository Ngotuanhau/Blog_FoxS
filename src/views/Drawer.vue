<template>
  <v-card>
    <v-navigation-drawer app width="350px" permanent>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="c-logo display-3" to="/">FOXS</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list dense nav class="c-menu">
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="c-text text-uppercase d-flex justify-end">trang chủ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="(item, index) in categories" :key="index" link>
          <v-list-item-content>
            <v-list-item-title class="c-text text-uppercase d-flex justify-end">{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="c-footer">
        <span
          class="c-text-footer"
        >&copy; Copyright &copy; {{ new Date().getFullYear() }} All rights</span>
        <span class="c-text-footer">reserved | This template is made</span>
        <span class="c-text-footer">
          with
          <v-icon class="icon-heart" color="red">$vuetify.icons.heart</v-icon>by
          <span class="c-author">Hau</span>
        </span>
      </div>

      <v-list-item link class="c-btn-login">
        <v-list-item-content>
          <v-list-item-title class="c-text text-uppercase d-flex justify-center" to="/">login</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  props: {
    categories: {}
  }
};
</script>

<style>
.c-logo {
  font-weight: 700 !important;
}
.c-menu {
  margin-top: 30px;
}
.c-text {
  letter-spacing: 4px;
}
.c-footer {
  display: grid;
  text-align: right;
  padding: 0 16px;
  margin-top: 70px;
}
.c-text-footer {
  letter-spacing: 2px;
  font-size: 13px;
  line-height: 25px;
}
.icon-heart {
  margin-right: 6px;
}
.c-author {
  color: red;
}
.c-btn-login {
  margin-top: 40px;
}
</style>