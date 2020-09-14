
<template>
  <div class="purchasing">
    <v-container class="my-5">
      <v-row wrap justify-space-around>
        <v-col xs="12" sm="12" md="6">
          <v-card flat class="pa-3">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Bezeichnung</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Annehmen</th>
                    <th class="text-left">Ablehnen</th>
                  </tr>
                </thead>
                <tbody :class="`pl-3 shoppingList ${shoppingList.status}`">
                  <tr v-for="item in shoppingList" :key="item.articleName">
                    <td>{{ item.articleName }}</td>
                    <td>{{ item.statusBoolean }}</td>
                    <td>
                      <v-btn text>
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                    </td>
                    <td>
                      <v-btn text>
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" xs="12">
                  <v-text-field label="Want to add something?" single-line></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col xs="12" sm="6" md="3">
          <v-card class="mx-auto" max-width="344">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Übersicht</div>
                <v-list>
                  <v-list-item v-for="item in overviewList" :key="item.username">
                    <v-list-item-avatar>
                      <v-img class="overview-pic" v-bind:src="item.profilePicture"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.username }}</v-list-item-title>
                      <v-list-item-subtitle>{{ item.balance }}</v-list-item-subtitle>
                      <v-divider class="mx-1" horizontal color="pink"></v-divider>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-list-item-content>
            </v-list-item>
           
            <v-list class="pa-20" pa-6> 

            <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
        v-bind="attrs"
          v-on="on"
          class="pa-20" color="pink" label="addMoney">Bought something already?</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Add your bought supplies here
        </v-card-title>

        <v-card-text cols="12" sm="12">
         <v-row>
      <v-col >
        <v-textarea
          class="mx-2"
          label="Product"
          rows="1"
          prepend-icon="add_shopping_cart"
        ></v-textarea>
         <v-textarea
          class="mx-2"
          label="Price"
          rows="1"
          prepend-icon="euro"
        ></v-textarea>
         <v-textarea
          class="mx-2"
          label="Comment"
          placeholder="Add an optional comment about this product."
          rows="2"
          prepend-icon="face"
        ></v-textarea>
         </v-col>
       
       
        

     
         </v-row>
        --eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Finish
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
            </v-list>
          </v-card>
        </v-col>

        <v-col xs="12" sm="6" md="3">
          <v-card>
            <v-tabs v-model="tab" background-color="dark" centered dark icons-and-text>
              <v-tabs-slider></v-tabs-slider>

              <v-tab href="#tab-1">
                Pending
                <v-icon color="pink">pending</v-icon>
              </v-tab>

              <v-tab href="#tab-2">
                Done
                <v-icon color="green">euro</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="i in 2" :key="i" :value="'tab-' + i"></v-tab-item>
            </v-tabs-items>
            <v-card-text v-for="item in openArticleList" :key="item.articleName">
              <v-chip class="mr-2" @click="lights" outlined color="deep-purple accent-4">
                <v-icon left>mdi-brightness-5</v-icon>
                {{ item.articleName }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    alarm() {
      alert("Turning on alarm...");
    },
    blinds() {
      alert("Toggling Blinds...");
    },
    lights() {
      alert("Toggling lights...");
    },
  },
  data() {
    return {
      dialogBought: false,
      checkbox: true,
      shoppingList: [
        {
          articleName: "Spüli",
          statusBoolean: false,
        },
        {
          articleName: "Müllsäcke",
          statusBoolean: false,
        },
        {
          articleName: "Ingwerbröd",
          statusBoolean: false,
        },
      ],
      overviewList: [
        {
          username: "Chris",
          profilePicture:
            "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: "+ " + "02.50" + " €",
        },
        {
          username: "Hannah",
          profilePicture:
            "https://images.unsplash.com/photo-1457131760772-7017c6180f05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: "- " + "01.50" + " €",
        },
        {
          username: "Rufus",
          profilePicture:
            "https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: "- " + "01.50" + " €",
        },
        {
          username: "Tim",
          profilePicture:
            "https://images.unsplash.com/photo-1516210673878-84fa2173547b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: "+ " + "02.50" + " €",
        },
      ],
      openArticleList: [
        {
          articleName: "Atommüll",
          status: "open",
        },
        {
          articleName: "Kuchen",
          status: "open",
        },
        {
          articleName: "Kaffee",
          status: "open",
        },
      ],
      colors: ["darkblue"],
      cycle: false,
      slides: ["Uno", "Second", "Third", "Fourth", "Fifth"],
    };
  },
};
</script>

<style>
</style>
 <!-- 

  <v-row wrap justify-space-around>
        <v-col xs="12" sm="12" md="6">
        <v-btn outlined block color="blue">1</v-btn>
        </v-col>
        <v-col xs="6" sm="6" md="3">
        <v-btn outlined block color="blue">2</v-btn>
        </v-col>
        <v-col xs="6" sm="6" md="3">
        <v-btn outlined block color="blue">2</v-btn>
        </v-col>
      </v-row>




        -->