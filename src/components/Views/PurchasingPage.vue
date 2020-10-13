<template>
  <div class="purchasing">
    <v-container class="my-5">
      <v-row wrap justify-space-around>
        <PurchasingDialogCashUp
          :showDialogCashUp="showDialogCashUp"
          :roomies="roomies"
          :newPurchase="newPurchase"
        ></PurchasingDialogCashUp>
        <v-btn class="ma-2" color="pink" @click="showDialogCashUp = true">Split!</v-btn>
        <PurchasingTable :shoppingList="shoppingList"></PurchasingTable>

        <PurchasingBillingOverview
          :roomies="roomies"
          :currencySymbol="currencySymbol"
          :newPurchase="newPurchase"
        ></PurchasingBillingOverview>

        <!--My Tabs:-->
        <PurchasingTabs :shoppingList="shoppingList"></PurchasingTabs>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PurchasingBillingOverview from "../PurchasingBillingOverview";
import PurchasingDialogCashUp from "../PurchasingDialogCashUp";
import PurchasingTable from "../PurchasingTable";
import PurchasingTabs from "../PurchasingTabs";

export default {
  components: {
    PurchasingBillingOverview,
    PurchasingDialogCashUp,
    PurchasingTable,
    PurchasingTabs
  },
  methods: {
    editItemName(editedItemName) {
      this.shoppingList.article = editedItemName;
    },

    saveChangesInEditPage() {}
  },
  computed: {},
  data() {
    return {
      showDialogCashUp: false,
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

      /*profilePicture:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",*/
      currencySymbol: " €",
      debug: true,
      tab: null,
      text: "Lorem ipsum",

      editedItemName: {
        name: "",
        // if deleted true, then enable a comment:
        comment: "",
        deleted: false
      },

      newPurchase: {
        name: "",
        price: "",
        comment: ""
      },
      shoppingList: [],
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

   {
          article: "Spüli",
          // Status: 0 - offen, 1 - pending,
          price: 0,
          status: 0,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: [],
        },
        {
          article: "Müllsäcke",
          price: 0,
          status: 0,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: [],
        },
        {
          article: "Ingwerbröd",
          price: 0,
          status: 0,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: [],
        },
        {
          article: "Aluhut",
          price: 0,
          status: 1,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: [],
        },
        {
          article: "Seife",
          price: 0,
          status: 1,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: [],
        },
        {
          article: "Wlan Repeater",
          price: 2.7,
          status: 99,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: [],
        },


        -->
