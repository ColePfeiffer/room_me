<template>
  <div class="purchasing">
    <PurchasingDialogNewArticle
      :showDialog="showDialogNewArticle"
      :currentUser="currentUser"
      :roomies="roomies"
      :shoppingList="shoppingList"
      @toggle-showDialogNewArticle="toggleShowDialogNewArticle"
    ></PurchasingDialogNewArticle>

    <v-speed-dial
      color="pink"
      v-model="fab"
      dark
      small
      absolute
      fixed
      bottom
      right
      slide-y-reverse-transition
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="showDialogSplit = true">
        <v-icon>mdi-plus</v-icon>
        <div class="fab-text-custom green">Split costs</div>
      </v-btn>
      <v-btn fab dark small color="pink" @click="showDialogNewArticle = true">
        <v-icon>mdi-plus</v-icon>
        <div class="fab-text-custom pink">Add article</div>
      </v-btn>
    </v-speed-dial>
    <v-container>
      <v-row wrap justify-space-around>
        <PurchasingDialogSplit
          :showDialog="showDialogSplit"
          :roomies="roomies"
          :newPurchase="newPurchase"
          @show-Dialog-Split="toggleDialogSplit"
          @reset-newPurchase="resetNewPurchase"
        ></PurchasingDialogSplit>

        <PurchasingBillingOverview :roomies="roomies" :currencySymbol="currencySymbol"></PurchasingBillingOverview>
        <PurchasingTabs :currentUser="currentUser" :shoppingList="shoppingList"></PurchasingTabs>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PurchasingBillingOverview from "../PurchasingBillingOverview";

import PurchasingTabs from "../PurchasingTabs";

// Dialogs
import PurchasingDialogSplit from "../PurchasingDialogSplit";
import PurchasingDialogNewArticle from "../PurchasingDialogNewArticle";

export default {
  components: {
    PurchasingBillingOverview,
    PurchasingDialogNewArticle,
    PurchasingDialogSplit,
    PurchasingTabs
  },

  data() {
    return {
      fab: false,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],

      model: 0,
      showDialogNewArticle: false,
      showDialogSplit: false,
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
      currencySymbol: " €",
      debug: true,
      newPurchase: {
        name: "",
        price: "",
        comment: ""
      },
      shoppingList: [],
      /* shoppingList: [
        {
          title: "Spüli",
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
],*/
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
  },
  methods: {
    toggleDialogSplit(newState) {
      if (this.debug) console.log("old state: " + this.showDialogSplit);
      this.showDialogSplit = newState;
      if (this.debug) console.log("new state: " + this.showDialogSplit);
    },
    toggleShowDialogNewArticle(newState) {
      if (this.debug) console.log("old state: " + this.showDialogNewArticle);
      this.showDialogNewArticle = newState;
      if (this.debug) console.log("new state: " + this.showDialogNewArticle);
    },
    resetNewPurchase() {
      this.newPurchase = {
        name: "",
        price: "",
        comment: ""
      };
    },
    setNewPurchaseName(name) {
      this.newPurchase.name = name;
    }
  },
  computed: {}
};
</script>

<style>
.balance-plus {
  color: green;
}

.balance-minus {
  color: red;
}
.fab-text-custom {
  position: absolute;
  right: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
}
</style>
