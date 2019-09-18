<template>
  <v-card>
    <v-navigation-drawer app width="350px" permanent>
      <v-list-item link to="/">
        <v-list-item-content>
          <v-list-item-title class="c-logo display-3">
            <div class="first">
              <span>FO</span>
            </div>
            <div class="second">
              <span>XS</span>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list dense nav class="c-menu">
        <v-list-item link to="/">
          <v-list-item-content>
            <v-list-item-title class="c-text text-uppercase d-flex justify-end">trang chủ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, index) in categories"
          :key="index"
          link
          :to="{name:'pages', params:{slug:item.slug}}"
        >
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

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            <router-link to="/login" v-if="!isAuthenticated" class="c-text-auth">Login</router-link>
            <a href="#" v-if="isAuthenticated" @click="logout" class="c-text-auth">Logout</a>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import anime from "animejs";

export default {
  props: {
    categories: {}
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },

  mounted() {
    this.animateLogo();
  },

  methods: {
    animateLogo() {
      anime({
        targets: ".first ",
        translateX: [-400, 0],
        duration: 1500,
        delay: 800,
        easing: "linear"
      });
      anime({
        targets: ".second",
        translateX: [-400, 0],
        duration: 1000,
        delay: 800,
        easing: "linear"
      });
    },

    logout() {
      this.$store.dispatch("logout").then(() => this.$router.push("/login"));
    }
  }
};
</script>

<style>
.c-logo {
  font-weight: 700 !important;
  display: flex;
  justify-content: center;
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
.c-text-auth {
  text-decoration: none;
  color: black !important;
}
</style>