<template>
  <v-app>
    <v-navigation-drawer :categories="categories"></v-navigation-drawer>
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
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from "./views/Drawer";
import Snackbar from "./components/Snackbar/Snackbar";

export default {
  name: "App",
  components: {
    vNavigationDrawer: NavigationDrawer,
    Snackbar
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
      categories: []
    };
  },

  mounted() {
    this.getCategories();
  },

  methods: {
    getCategories() {
      axios.get("/object-types").then(response => {
        this.categories = response.data.object_types;
        console.log(this.categories);
      });
    },

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
</style>
