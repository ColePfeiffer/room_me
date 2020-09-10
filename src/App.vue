<template>
  <v-app class>
    <v-navigation-drawer v-model="drawer" app clipped color="#241c24" expand-on-hover dark>
      <v-list dense>
        <v-list-item to="/home">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/meineWG">
          <v-list-item-action>
            <v-icon>mdi-account-switch</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Meine WG</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/einkaufen">
          <v-list-item-action>
            <v-icon>mdi-shopping</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Einkaufen</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/putzen">
          <v-list-item-action>
            <v-icon>mdi-broom</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Putzen</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/settings">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/todo">
          <v-list-item-action>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ToDo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-card color="grey lighten-4" flat tile>
      <v-toolbar dark dense color="#211E21">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <!--                 Title for Toolbar-->
        <v-toolbar-title></v-toolbar-title>
        <v-spacer></v-spacer>
        <!--                Buttons Profile-->
        <v-btn icon to="/Login">
          <v-icon color="grey">mdi-account</v-icon>
        </v-btn>
        <v-btn text color="grey">
        <span>Ausloggen</span>
        <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <v-content class="content">
      <!--            Hier werden einzelne Seiten reingeladen-->
      <router-view></router-view>
    </v-content>

    <v-footer dark dense color="#211E21">
      <v-spacer></v-spacer>
      <div>RoomMe | &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  data: () => ({
    drawer: false,
  }),
};

// Colors: EEF5F0 - weiß
// 9FB18F, helles grün, F6C01D gelb, rot B1493D, tannengrün 315458
</script>

<style scoped>
.header {
  background: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
}

.header a {
  color: #fff;
  padding-right: 5px;
}

.content {
  color: #f6f0f1;
  background-color: #315458;
}

.content h1 {
  color: #ce9242;
}
</style>