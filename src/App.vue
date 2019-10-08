<template>
  <v-app>
    <v-navigation-drawer :categories="categories" v-model="drawer"></v-navigation-drawer>
    <v-app-bar @toogle="drawer=!drawer" v-if="$vuetify.breakpoint.smAndDown"></v-app-bar>
    <v-content>
      <v-container fluid>
        <Snackbar />
        <v-snackbar
          :message="message"
          :color="color"
          :top="y === 'top'"
          :bottom="y === 'bottom'"
          :left="x ==='left'"
          :right="x === 'right'"
          :multi-line="mode === 'multi-line'"
          :vertical="mode === 'vertical'"
          v-model="snackbar"
        >
          {{message}}
          <v-btn text dark @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
        <transition name="router-animate">
          <router-view></router-view>
        </transition>
        <go-top :size="40" :bottom="90" bg-color="brown" :has-outline="false" :max-width="320"></go-top>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from "./views/Drawer";
import AppBar from "./views/Toolbar";
import Snackbar from "./components/Snackbar/Snackbar";
import GoTop from "@inotom/vue-go-top";
import gql from "graphql-tag";

export default {
  name: "App",
  components: {
    vNavigationDrawer: NavigationDrawer,
    vAppBar: AppBar,
    Snackbar,
    GoTop
  },

  data() {
    return {
      color: "",
      snackbar: false,
      message: "",
      timeout: null,
      y: null,
      x: null,
      mode: null,
      categories: [],
      drawer: null
    };
  },

  apollo: {
    categories: gql`
      query {
        categories {
          id
          name
          slug
        }
      }
    `
  },

  watch: {
    categories(newVal) {
      console.log(newVal);
    }
  },

  methods: {
    showSnackbar(message, timeout = 3000, yPos = "top", xPos, mode) {
      this.message = message;
      this.timeout = timeout;
      this.y = yPos;
      this.x = xPos;
      this.mode = mode;
      this.snackbar = true;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.router-animate-enter-active {
  animation: coming 1s;
  animation-delay: 0.5s;
  opacity: 0;
}

.router-animate-leave-active {
  animation: going 1s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>