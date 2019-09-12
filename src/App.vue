<template>
  <v-app>
    <v-navigation-drawer :categories="categories"></v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from "./views/Drawer";

export default {
  name: "App",
  components: {
    vNavigationDrawer: NavigationDrawer
  },

  data() {
    return {
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
