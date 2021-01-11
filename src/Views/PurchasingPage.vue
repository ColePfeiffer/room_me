<template>
  <div class="purchasing">
    <!-- Fab Button -->
    <v-speed-dial
      class="fab-button"
      color="pink"
      v-model="fab"
      fixed
      right
      bottom
      slide-y-reverse-transition
    >
      <template v-slot:activator>
        <v-btn v-model="fab" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
            <v-btn fab dark small color="grey">
        <v-icon>mdi-empty</v-icon>
        <div class="fab-text-custom grey">Reset balance</div>
      </v-btn>
      <v-btn fab dark small color="green" @click="changeDialogState('CASH')">
        <v-icon>euro</v-icon>
        <div class="fab-text-custom green">Add bought item</div>
      </v-btn>
      <v-btn fab dark small color="pink" @click="changeDialogState('NEW')">
        <v-icon>mdi-shopping</v-icon>
        <div class="fab-text-custom pink">Add to shopping list</div>
      </v-btn>
    </v-speed-dial>
    <!-- Dialogs -->
    <DialogAddArticle
      :showDialog="showDialogSplit"
      :view="ViewStateOfDialogSplit"
      :categories="categories"
      :existingArticle="existingArticle"
      @toggle-Dialog="toggleDialogSplit"
      @add-Article="addArticle"
      @change-Status-Of-Article="changeStatusOfArticle"
    ></DialogAddArticle>

    <v-container>
      <v-row wrap align="center" justify="center">
        <v-col
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
          class="d-flex flex-column justify-center align-center"
        >
          <TheBalanceBoard class="add-padding"></TheBalanceBoard>
        </v-col>
        <v-col
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
          class="d-flex flex-column justify-center align-center"
        >
          <ThePurchasingTabs
            class="add-padding"
            @open-Dialog-Add-Article="openDialogAddArticle"
          ></ThePurchasingTabs>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TheBalanceBoard from "../components/purchasing/TheBalanceBoard";
import ThePurchasingTabs from "../components/purchasing/ThePurchasingTabs";
import DialogAddArticle from "../components/purchasing/DialogAddArticle";

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
            "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xlYW5pbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
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
            "https://images.unsplash.com/photo-1559842438-2942c907c8fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        }
      ]
    };
  },
  methods: {
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
        article.acceptedBy = this.$store.getters.currentUser;
      } else if (status === 2) {
        article.purchasedBy = this.$store.getters.currentUser;
      }

      article.status = status;
    },
    addArticle({ newArticle, status }) {
      newArticle.createdOn = new Date().toISOString().substr(0, 10);

      switch (status) {
        case 0: // open
          newArticle.createdBy = this.$store.getters.currentUser;
          break;
        case 1: // pending
          break;
        case 2: // bought
          newArticle.createdBy = this.$store.getters.currentUser;
          newArticle.acceptedBy = this.$store.getters.currentUser;
          newArticle.purchasedBy = this.$store.getters.currentUser;
          newArticle.avatar = this.$store.getters.currentUser.profilePicture;
          break;

        default:
          break;
      }

      // avatar, category
      newArticle.status = status;

      this.$store.state.shoppingList.push(newArticle);
    }
  }
};
</script>

<style>
.fab-button {
  margin-bottom: 1%;
  position: fixed;
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

.add-padding {
  padding: 20px;
}
</style>
