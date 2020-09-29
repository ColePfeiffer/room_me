
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
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <th class="text-left" v-bind="attrs" v-on="on">Annehmen</th>
                      </template>
                      <span>Was bedeutet Annehmen?</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <th class="text-left" v-bind="attrs" v-on="on">Abrechnen</th>
                      </template>
                      <span>Was bedeutet Abrechnen?</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <th class="text-left" v-bind="attrs" v-on="on">Ablehnen</th>
                      </template>
                      <span>Meeeeeeeeeeta</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <th class="text-left" v-bind="attrs" v-on="on">Bearbeiten</th>
                      </template>
                      <span>Meeeeeeeeeeta</span>
                    </v-tooltip>
                  </tr>
                </thead>
                <!--Shopping List Overview: Shows all products (should show only with status 0! -->
                <tbody :class="`pl-3 shoppingList ${shoppingList.status}`">
                  <tr v-for="item in shoppingList" :key="item.articleName">
                    <td>{{ item.articleName }}</td>
                    <td>
                      <v-btn text>
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                    </td>
                    <td>
                      <v-btn text>
                        <v-icon>euro</v-icon>
                      </v-btn>
                    </td>
                    <td>
                      <v-btn text>
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </td>
                    <td>
                      <v-btn text>
                        <v-icon>edit</v-icon>
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
          <v-card class="ma-auto" max-width="344">
            <v-list-item>
              <v-list-item-content>
                <div class="overline">Übersicht</div>
                <v-list>
                  <v-list-item v-for="item in roomies" :key="item.username">
                    <div class="text-center">
                      <!--Loop caused server break down, :retain-focus="false" is workaround for this prob
                      https://stackoverflow.com/questions/59729112/vue-js-maximum-call-stack-size-exceeded-error-use-dialog-for-child-and-passin/62018919#62018919-->
                      <v-dialog v-model="dialogProfilePage" :retain-focus="false" width="500">
                        <template v-slot:activator="{ on, attrs }">
                          <v-list-item-avatar>
                            <v-img
                              @click="dialogProfilePage"
                              class="profile-picture"
                              max-width="60"
                              max-height="60"
                              v-bind="attrs"
                              v-on="on"
                              v-bind:src="item.profilePicture"
                            ></v-img>
                          </v-list-item-avatar>
                        </template>

                        <!--Profile Page-->
                        <v-card>
                          <v-card-title class="headline grey lighten-2">Profile Page</v-card-title>
                          <v-card-text cols="12" sm="12">
                            <v-row class="justify-center mt-5">
                              <v-img
                                max-width="160"
                                max-height="160"
                                class="profile-picture ma-2 rounded-circle"
                                src="https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                              >
                                <v-btn absolute dark fab right bottom color="orange">
                                  <v-icon>mdi-plus</v-icon>
                                </v-btn>
                              </v-img>
                            </v-row>

                            <v-row>
                              <v-col>
                                <v-textarea
                                  class="mx-2"
                                  placeholder="Boss Bitch"
                                  rows="1"
                                  append-outer-icon="edit"
                                  prepend-icon="mdi-account"
                                ></v-textarea>

                                <v-textarea
                                  class="mx-2"
                                  label="Info"
                                  placeholder="...Tell your Roomies something about yourself!"
                                  rows="1"
                                  append-outer-icon="edit"
                                  prepend-icon="info"
                                ></v-textarea>
                              </v-col>
                            </v-row>
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="dialogProfilePage = false">Safe</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>

                    <!--Übersicht des aktuellen Guthabens-->
                    <v-list-item-content>
                      <v-list-item-title>{{ item.username }}</v-list-item-title>
                      <v-list-item-subtitle>{{ item.balance }}</v-list-item-subtitle>
                      <v-divider class="ma-1" horizontal color="pink"></v-divider>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-list-item-content>
            </v-list-item>

            <v-list>
              <div class="text-center">
                <v-dialog v-model="dialogBought" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      class="ma-2"
                      color="pink"
                      label="addMoney"
                    >Bought already?</v-btn>
                  </template>

                  <!--Dialog To Enter Bought Supplies:-->
                  <v-card>
                    <v-card-title class="headline ighten-2">Add your bought supplies here</v-card-title>
                    <v-card-text cols="12" sm="12">
                      <v-row>
                        <v-col>
                          <v-row class="mx-2">
                            <v-text-field
                              v-model="newPurchase.name"
                              sm="12"
                              m="12"
                              label="Product"
                              :counter="15"
                              prepend-icon="add_shopping_cart"
                              color="#FF6F00"
                            ></v-text-field>
                            <v-text-field
                              v-model="newPurchase.price"
                              :rules="[numberRule]"
                              sm="6"
                              m="6"
                              :counter="5"
                              label="Price"
                              prepend-icon="euro"
                              color="#FF6F00"
                            ></v-text-field>
                          </v-row>
                          <v-text-field
                            v-model="newPurchase.comment"
                            class="mx-2"
                            label="Comment"
                            placeholder="Add an optional comment about this product."
                            prepend-icon="comment"
                            color="#FF6F00"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <!-- Roomie Chip -->
                      <v-chip-group column multiple active-class="primary--text"> 
                        <v-row class="mx-2" v-for="roomie in roomies" :key="roomie.id">
                          <v-chip
                            :color ="roomie.color"
                            :outlined ="roomieChipOutlined(roomie)"
                            @click="selectRoomie(roomie)"
                         
                          >
                            <v-avatar left>
                              <v-img v-bind:src="roomie.profilePicture"></v-img>
                            </v-avatar>
                            <strong>{{roomie.username}}</strong>&nbsp;
                          </v-chip>
                        </v-row>
                      </v-chip-group>

                      <v-row class="justify-center">
                        <v-btn color="#FF6F00" justify-center @click="addPurchase">Split!</v-btn>
                      </v-row>
                    </v-card-text>
                    <v-card-actions></v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-list>
          </v-card>
        </v-col>
        <!--My Tabs:-->
        <v-col xs="12" sm="6" md="3">
          <v-card>
            <v-tabs v-model="tab" background-color="dark" centered dark icons-and-text>
              <v-tabs-slider></v-tabs-slider>

              <v-tab href="#tab-1">
                <v-icon color="pink">mdi-heart</v-icon>
                <span class="mb-2">Pending</span>
              </v-tab>

              <v-tab href="#tab-2">
                Done
                <v-icon color="green">euro</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="i in 2" :key="i" :value="'tab-' + i">
                <v-card text>
                  <v-card-text>{{ text }}</v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>

        <!--
  


        -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    addPurchase() {
      console.log(this.newPurchase.price);
      // hide dialoge
      this.dialogBought = false;

      var sharedByNumber = 0;
      // var buyer
      var individualPrice;

      // count selected roomies to determine divider
       this.roomies.forEach(function (roomie){
         if(roomie.selected){
           sharedByNumber = sharedByNumber + 1;
         }
      });

      // calculate individual price
      if (this.debug) console.log("Divided by", sharedByNumber)
      individualPrice = this.newPurchase.price / sharedByNumber;
      individualPrice = individualPrice.toFixed(2);
      if (this.debug) console.log("Individual Price: ", individualPrice);

      this.roomies.forEach(function (roomie){
         if(roomie.selected){
           roomie.balance = roomie.balance + individualPrice;
         }
      });

     // reset everything
     this.roomies.forEach(function (roomie){
        roomie.selected = true;
      });

      this.newPurchase.name = "";
      this.newPurchase.price = "";
      this.newPurchase.comment = "";


      if (this.debug) console.log("Split!");
    },

    selectRoomie(selected_roomie){
      this.roomies.forEach(function (roomie, index){
        if(roomie == selected_roomie){
          roomie.selected = !roomie.selected;
          console.log(roomie.selected, index);
        }
      }) 
      },
    alarm() {
      alert("Turning on alarm...");
    },
    blinds() {
      alert("Toggling Blinds...");
    },
    lights() {
      alert("Toggling lights...");
    },
    sortBy(prop) {
      // Compares Items next to each other: alphabetical order!
      // if true -1, else 1
      // if a -1, else b 1
      this.shoppingList.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    filterOpen(prop) {
      return prop == 0;
    },
    filterPending(prop) {
      return prop == 1;
    },
    filterDone(prop) {
      return prop == 2;
    },

    roomieChipOutlined(roomie){
      if(roomie.selected){
        return false
      }else{
        return true
      }
    }
  },
  computed: {
  },
  data() {
    return {
      numberRule: v  => {
      if (!v.trim()) return true;
      if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true;
      return 'Number has to be between 0 and 999';
    },
      debug: true,
      currentTab: 0,
      tab: null,
      text: "Lorem ipsum",
    
      selectedRoomies: [],

      dialogBought: false,
      dialogProfilePage: false,
      checkbox: true,
      newPurchase: {
        name: "",
        price: "",
        comment: ""
      },
      flatmate: {
        username: "Bo",
        profilePicture:
          "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      },
      shoppingList: [
        {
          articleName: "Spüli",
          // Status: 0 - offen, 1 - pending,
          price: 0,
          status: 0,
          statusText: "open",
          boughtBy: ""
        },
        {
          articleName: "Müllsäcke",
          price: 0,
          status: 0,
          statusText: "open",
          boughtBy: ""
        },
        {
          articleName: "Ingwerbröd",
          price: 0,
          status: 0,
          statusText: "open",
          boughtBy: ""
        },
        {
          articleName: "Aluhut",
          price: 0,
          status: 1,
          statusText: "pending",
          boughtBy: "",
          acceptedBy: ""
        },
        {
          articleName: "Seife",
          price: 0,
          status: 1,
          statusText: "pending",
          boughtBy: "",
          acceptedBy: ""
        },
        {
          articleName: "Wlan Repeater",
          price: 2.7,
          status: 2,
          statusText: "done",
          boughtBy: this.username,
          acceptedBy: this.username
        }
      ],
      // used to be OverviewList
      roomies: [
        {
          id: 0,
          username: "Chris",
          profilePicture:
            "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: "+ " + "02.50" + " €",
          selected: true,
          color: "#1F85DE"
        },
        {
          id: 1,
          username: "Hannah",
          profilePicture:
            "https://images.unsplash.com/photo-1457131760772-7017c6180f05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: "- " + "01.50" + " €",
          selected: false,
          color: "#DE591F"
        },
        {
          id: 2,
          username: "Rufus",
          profilePicture:
            "https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: "- " + "01.50" + " €",
          selected: true,
          color: "#BDA0EC"
        },
        {
          id: 3,
          username: "Tim",
          profilePicture:
            "https://images.unsplash.com/photo-1516210673878-84fa2173547b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: "+ " + "02.50" + " €",
          selected: true,
          color: "#EBE386"
        }
      ],
      openArticleList: [
        {
          articleName: "Atommüll",
          status: "open"
        },
        {
          articleName: "Kuchen",
          status: "open"
        },
        {
          articleName: "Kaffee",
          status: "pending"
        }
      ]
    };
  }
};
</script>

<style>
</style>
 <!-- 

 


        -->