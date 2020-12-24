<template>
  <div class="purchasing">
    <DialogAddArticle
      :showDialog="showDialogSplit"
      :roomies="roomies"
      :currentUser="currentUser"
      :view="ViewStateOfDialogSplit"
      :categories="categories"
      :existingArticle="existingArticle"
      @toggle-Dialog="toggleDialogSplit"
      @add-Article="addArticle"
      @change-Status-Of-Article="changeStatusOfArticle"
    ></DialogAddArticle>

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
      <v-btn fab dark small color="green" @click="changeDialogState('CASH')">
        <v-icon>euro</v-icon>
        <div class="fab-text-custom green">Add bought item</div>
      </v-btn>
      <v-btn fab dark small color="pink" @click="changeDialogState('NEW')">
        <v-icon>mdi-shopping</v-icon>
        <div class="fab-text-custom pink">Add to shopping list</div>
      </v-btn>
    </v-speed-dial>
    <v-container>
      <v-row wrap justify-space-around>
        <TheBalanceBoard :roomies="roomies" :currencySymbol="currencySymbol"></TheBalanceBoard>
        <ThePurchasingTabs
          :currentUser="currentUser"
          :shoppingList="shoppingList"
          :currencySymbol="currencySymbol"
          @delete-article="deleteArticle"
          @open-Dialog-Add-Article="openDialogAddArticle"
        ></ThePurchasingTabs>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TheBalanceBoard from "../purchasing/TheBalanceBoard";
import ThePurchasingTabs from "../purchasing/ThePurchasingTabs";
import DialogAddArticle from "../purchasing/DialogAddArticle";

export default {
  components: {
    TheBalanceBoard,
    DialogAddArticle,
    ThePurchasingTabs
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
      currencySymbol: " €",
      debug: true,
      existingArticle: {
        name: " ",
        price: "",
        comment: "",
        createdOn: "",
        createdBy: "", // ref or id
        acceptedBy: "", // ref or id
        purchasedBy: "", // ref or id
        avatar: "",
        category: "",
        involvedRoomies: [],
        status: 0
      },
      ViewStateOfDialogSplit: "CASH",
      categories: [
        {
          id: 1,
          name: "Groceries",
          color: "#81b29a",
          isDefault: true,
          avatar:
            "https://images.unsplash.com/photo-1584473457406-6240486418e9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80"
        },
        {
          id: 2,
          name: "Household",
          color: "#e07a5f",
          isDefault: false,
          avatar:
            "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y2xlYW5pbmclMjBjaGVtaWNhbHN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
          id: 3,
          name: "Snacks",
          color: "#f2cc8f",
          isDefault: false,
          avatar:
            "https://images.unsplash.com/photo-1517093602195-b40af9688b46?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c25hY2tzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
          id: 4,
          name: "Drinks",
          color: "#3d405b",
          isDefault: false,
          avatar:
            "https://images.unsplash.com/photo-1494962227006-107baac595eb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGRyaW5rc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
      ],
      roomies: [
        {
          id: 0,
          username: "Chris",
          description: "Hi there!",
          profilePicture:
            "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: 0,
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
          balance: 0,
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
      ],
      shoppingList: []
    };
  },
  methods: {
    deleteArticle(article) {
      const position = this.shoppingList.indexOf(article);
      if (this.debug)
        console.log("Position of " + article.name + " is " + position);
      this.shoppingList.splice(position, 1);
    },
    openDialogAddArticle(item) {
      this.changeDialogState("CASH_UP_EXISTING");
      this.existingArticle = item;
    },
    changeDialogState(newViewState) {
      this.ViewStateOfDialogSplit = newViewState;
      this.showDialogSplit = true;
    },
    toggleDialogSplit(visible) {
      this.showDialogSplit = visible;
    },
    changeStatusOfArticle({ article, status }) {
      if (status === 1) {
        article.acceptedBy = this.currentUser;
      } else if (status === 2) {
        article.purchasedBy = this.currentUser;
      }

      article.status = status;
    },
    addArticle({ newArticle, status }) {
      newArticle.createdOn = new Date().toISOString().substr(0, 10);

      switch (status) {
        case 0: // open
          newArticle.createdBy = this.currentUser;
          break;
        case 1: // pending
          break;
        case 2: // bought
          newArticle.createdBy = this.currentUser;
          newArticle.acceptedBy = this.currentUser;
          newArticle.purchasedBy = this.currentUser;
          newArticle.avatar = this.currentUser.profilePicture;
          break;

        default:
          break;
      }

      // avatar, category
      newArticle.status = status;

      this.shoppingList.push(newArticle);
    }
  },
  computed: {
    currentUser() {
      // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/find
      return this.roomies.find(roomie => roomie.isLoggedIn === true);
    }
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
