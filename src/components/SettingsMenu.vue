<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="pink" icon dark v-bind="attrs" v-on="on">
          <v-icon color="grey">mdi-account</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img :src="$store.getters.currentUser.profilePicture" alt="John" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <v-select
                  :value="$store.getters.currentUser"
                  label="Current User"
                  :items="$store.state.roomies"
                  item-text="username"
                  item-value="id"
                  @input="$store.commit('setCurrentUser', $event)"
                ></v-select>
              </v-list-item-title>
              <v-list-item-subtitle>Room x {{ $store.getters.currentUser.username }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="debug" @click="$store.commit('toggleDebug')" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable Debug-Mode</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink" text @click="menu = false">Save</v-btn>
          <v-btn text @click="menu = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    fav: true,
    menu: false,
    debug: true
  })
};
</script>