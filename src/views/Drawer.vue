<template>
  <v-card>
    <v-navigation-drawer
      app
      width="300px"
      :value="value"
      @input="$emit('input', $event)"
      mobile-break-point="960"
    >
      <v-list-item link to="/">
        <v-list-item-content>
          <v-list-item-title class="logo display-3">
            <div class="logo-first">
              <span>FO</span>
            </div>
            <div class="logo-second">
              <span>XS</span>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list dense nav class="menu">
        <v-list-item link to="/">
          <v-list-item-content>
            <v-list-item-title class="menu-text">trang chủ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="item in categories"
          :key="item.id"
          link
          :to="{name:'categories', params:{id:item.id}}"
        >
          <v-list-item-content>
            <v-list-item-title class="menu-text">{{item.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="footer">
        <span class="footer-text">&copy; Copyright &copy; {{ new Date().getFullYear() }} All rights</span>
        <span class="footer-text">reserved | This template is made</span>
        <span class="footer-text">
          with
          <v-icon class="icon-heart" color="red">$vuetify.icons.heart</v-icon>by
          <span class="footer-text__author">Hau</span>
        </span>
      </div>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            <router-link to="/login" v-if="!isAuthenticated" class="btn-auth">Login</router-link>
            <a href="#" v-if="isAuthenticated" @click="logout" class="btn-auth">Logout</a>
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
    categories: {},
    value: false
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
        targets: ".lo-first ",
        translateX: [-400, 0],
        duration: 1500,
        delay: 800,
        easing: "linear"
      });
      anime({
        targets: ".logo-second",
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

<style lang='scss'>
@import "../styles/main.scss";

.logo {
  font-weight: 700 !important;
  display: flex;
  justify-content: center;
}

.menu {
  margin-top: 30px;

  .menu-text {
    letter-spacing: 4px;
    display: flex;
    justify-content: flex-end;
    text-transform: uppercase;
  }
}

.footer {
  display: grid;
  text-align: right;
  padding: 0 16px;
  margin-top: 70px;

  .footer-text {
    letter-spacing: 2px;
    font-size: 13px;
    line-height: 25px;
  }

  .icon-heart {
    margin-right: 6px;
  }

  .footer-text__author {
    color: $cl-text-author;
  }
}

.btn-auth {
  text-decoration: none;
  color: $cl-text !important;
}
</style>