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
                  <tr v-for="item in openItems
            " :key="item.article
">
                    <td>
                      {{ item.article
                      }}
                    </td>
                    <td>
                      <v-btn text>
                        <v-icon @click="acceptItem(item)">mdi-check</v-icon>
                      </v-btn>
                    </td>
                    <td>
                      <v-btn text>
                        <v-icon @click="cashUpItem(item)">euro</v-icon>
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
                  <v-list-item v-for="roomie in roomies" :key="roomie.id">
                    <profilePage :roomie="roomie" @save-changes="saveChanges"></profilePage>
                    <div class="text-center">
                      <v-list-item-avatar>
                        <v-img
                          @click="roomie.showProfilePage = true"
                          class="profile-picture"
                          max-width="60"
                          max-height="60"
                          v-bind="attrs"
                          v-on="on"
                          v-bind:src="roomie.profilePicture"
                        ></v-img>
                      </v-list-item-avatar>
                    </div>
                    <!--Übersicht des aktuellen Guthabens-->
                    <v-list-item-content>
                      <v-list-item-title>
                        {{
                        roomie.username
                        }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <span v-if="roomie.balance >= 0" class="balance-plus">
                          {{
                          "+" + roomie.balance + currencySymbol
                          }}
                        </span>
                        <span v-else class="balance-minus">
                          {{
                          roomie.balance + currencySymbol
                          }}
                        </span>
                      </v-list-item-subtitle>
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
                            :color="roomie.color"
                            :outlined="roomieChipOutlined(roomie)"
                            @click="selectRoomie(roomie)"
                          >
                            <v-avatar left>
                              <v-img v-bind:src="roomie.profilePicture"></v-img>
                            </v-avatar>
                            <strong>{{ roomie.username }}</strong>&nbsp;
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
          <v-tabs centered color="cyan" dark icons-and-text>
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab href="#tab-1">
              <v-icon color="pink">mdi-heart</v-icon>
              <span class="mb-2">Pending</span>
            </v-tab>

            <v-tab href="#tab-2">
              Done
              <v-icon color="green">euro</v-icon>
            </v-tab>

            <v-tab-item v-for="i in 2" :key="i" :value="'tab-' + i">
              <v-card flat v-for="item in pendingItems" :key="item.article
  ">
                <v-card-text v-if="i == 1">
                  {{ item.article
                  }} accepted by:
                  {{ item.acceptedBy }}
                </v-card-text>
                <v-card-text v-if="i == 2">
                  {{ item.article
                  }}
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-col>

        <!--
  
 <tbody :class="`pl-3 shoppingList ${shoppingList.status}`">
                  <tr v-for="item in openItems
            " :key="item.article
">
                    <td>{{ item.article
           }}</td>

        -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import profilePage from "../profilePage";

export default {
  components: {
    profilePage
  },
  methods: {
    saveChanges(roomie, changedRoomie) {
      console.log(roomie.username);
      console.log(changedRoomie.username);

      roomie = changedRoomie;
      roomie.showProfilePage = false;
    },
    acceptItem(item) {
      /* Status: 0 = offen, 1 = accepted, 2 = bought, 99 = declined */
      item.status = 1;
      item.acceptedBy = this.currentUser.username;
    },
    cashUpItem(item) {
      this.completedPurchase = false;
      this.newPurchase.name = item.article;
      this.dialogBought = true;

      this.currentItemForCashingUp = item;
    },
    addPurchase() {
      //let vn = this;

      if (this.debug) console.log("Preis: " + this.newPurchase.price);

      // hide dialoge
      this.dialogBought = false;

      /*
      var sharedByNumber = 0;
      // var buyer
      var individualPrice;

      // count selected roomies to determine divider
      this.roomies.forEach(function(roomie) {
        if (roomie.selected) {
          sharedByNumber = sharedByNumber + 1;
        }
      });

      // calculate individual price
      if (this.debug === true) console.log("Divided by", sharedByNumber);
      individualPrice = this.newPurchase.price / sharedByNumber;
      individualPrice = individualPrice.toFixed(2);
      if (this.debug === true)
        console.log("Individual Price: ", individualPrice);

    
      this.roomies.forEach(function(roomie) {
        if (roomie.selected) {
          roomie.balance = parseInt(roomie.balance) + individualPrice;
          if (vn.this.debug) console.log(roomie.balance);
        }
      });
      */
      // checks if this dialog was opened via the cash up-option

      if (this.completedPurchase === false) {
        this.openItems.forEach(element => {
          if (element === this.currentItemForCashingUp) {
            element.acceptedBy = this.currentUser.username;
            element.boughtBy = this.currentUser.username;
            if (this.debug) console.log(this.currentUser.username);
            element.status = 2;
          }
        });
      }

      // reset everything
      this.roomies.forEach(function(roomie) {
        roomie.selected = true;
      });

      this.newPurchase.name = "";
      this.newPurchase.price = "";
      this.newPurchase.comment = "";

      if (this.debug) console.log("Split!");
      this.completedPurchase = true;
    },

    selectRoomie(selected_roomie) {
      this.roomies.forEach(function(roomie, index) {
        if (roomie == selected_roomie) {
          roomie.selected = !roomie.selected;
          console.log(roomie.selected, index);
        }
      });
    },

    sortBy(prop) {
      // Compares Items next to each other: alphabetical order!
      // if true -1, else 1
      // if a -1, else b 1
      this.shoppingList.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },

    roomieChipOutlined(roomie) {
      if (roomie.selected) {
        return false;
      } else {
        return true;
      }
    }
  },
  computed: {
    // Wählt einzig die aktiven Items aus der ShoppingList aus, um diese anzuzeigen
    openItems() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.shoppingList.filter(function(value) {
        return value.status === 0;
      });
    },
    pendingItems() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.shoppingList.filter(function(value) {
        return value.status === status;
      });
    },
    billedItems() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.shoppingList.filter(function(value) {
        return value.status === 99;
      });
    }
  },
  data() {
    return {
      numberRule: v => {
        if (!v.trim()) return true;
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true;
        return "Number has to be between 0 and 999";
      },
      currentUser: {
        id: 0,
        username: "Chris",
        description: "Hi there!",
        profilePicture:
          "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        balance: +3,
        balancePlus: true,
        selected: true,
        color: "#1F85DE"
      },
      // Einkauf
      completedPurchase: false,
      currentItemForCashingUp: {},
      profilePicture:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
      currencySymbol: " €",
      debug: true,
      currentTab: 0,
      tab: null,
      text: "Lorem ipsum",

      selectedRoomies: [],

      dialogBought: false,
      checkbox: true,
      newPurchase: {
        name: "",
        price: "",
        comment: ""
      },
      shoppingList: [
        {
          article: "Spüli",
          // Status: 0 - offen, 1 - pending,
          price: 0,
          status: 0,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: []
        },
        {
          article: "Müllsäcke",
          price: 0,
          status: 0,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: []
        },
        {
          article: "Ingwerbröd",
          price: 0,
          status: 0,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: []
        },
        {
          article: "Aluhut",
          price: 0,
          status: 1,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: []
        },
        {
          article: "Seife",
          price: 0,
          status: 1,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: []
        },
        {
          article: "Wlan Repeater",
          price: 2.7,
          status: 99,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: []
        }
      ],
      // used to be OverviewList
      roomies: [
        {
          id: 0,
          username: "Chris",
          description: "Hi there!",
          profilePicture:
            "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: +3,
          balancePlus: true,
          selected: true,
          color: "#1F85DE",
          showProfilePage: false,
          isLoggedIn: true
        },
        {
          id: 1,
          username: "Hannah",
          description: "Möpp",
          profilePicture:
            "https://images.unsplash.com/photo-1457131760772-7017c6180f05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: -3,
          balancePlus: false,
          selected: true,
          color: "#DE591F",
          showProfilePage: false,
          isLoggedIn: false
        },
        {
          id: 2,
          username: "Rufus",
          description: "",
          profilePicture:
            "https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: 0,
          balancePlus: true,
          selected: true,
          color: "#BDA0EC",
          showProfilePage: false,
          isLoggedIn: false
        },
        {
          id: 3,
          username: "Tim",
          description: "",
          profilePicture:
            "https://images.unsplash.com/photo-1516210673878-84fa2173547b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: 0,
          balancePlus: true,
          selected: true,
          color: "#EBE386",
          showProfilePage: false,
          isLoggedIn: false
        }
      ]
    };
  }
};
</script>

<style>
.balance-plus {
  color: green;
}

.balance-minus {
  color: red;
}
</style>
 <!-- 

 


        -->