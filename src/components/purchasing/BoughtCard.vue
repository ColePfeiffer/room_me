<template>
  <v-card v-if="showSettings == false" class="boughtCard" height="130px">
    <v-row align="center" justify="center" no-gutters>
      <v-col s="9" md="9">
        <v-row>
          <v-col md="3">
            <v-img
              class="profile-picture rounded-circle"
              width="65"
              max-width="65"
              max-height="65"
              v-bind:src="article.purchasedBy.profilePicture"
            ></v-img>
          </v-col>
          <v-col md="9">
            <v-row no-gutters>
              <v-card-title id="articleName"
                >{{ article.name }}
                <v-btn text dense @click="showSettings = true">
                  <v-icon small>edit</v-icon>
                </v-btn>
              </v-card-title>
            </v-row>
            <v-row no-gutters>
              <v-card-text id="articleInformation">
                {{ article.purchasedBy.username }}
                <span v-if="article.comment != ''">
                  - {{ article.comment }}
                </span>
              </v-card-text>
            </v-row>
          </v-col>
        </v-row></v-col
      >
      <v-divider vertical></v-divider>
      <v-col s="2" md="2">
        <v-card-title id="price">
          {{ article.price }} {{ currencySymbol }}
        </v-card-title>
      </v-col>
    </v-row>
  </v-card>

  <v-card v-else class="boughtCard" height="130px" dark>
    <v-row align="center" justify="center" no-gutters>
      <v-col s="9" md="9">
        <v-row>
          <v-col md="3">
            <v-img
              class="profile-picture rounded-circle"
              width="65"
              max-width="65"
              max-height="65"
              v-bind:src="article.purchasedBy.profilePicture"
            ></v-img>
          </v-col>
          <v-col md="9">
            <v-row no-gutters>
              <v-col cols="6">
                <v-card-title id="articleName">
                  <v-text-field
                    v-model="article.name"
                  >
                    <template v-slot:append-outer>
                      <v-row align="center" justify="center" no-gutters> 
                        <v-col cols=6>
                          <v-btn text  @click="showSettings = false">
                            <v-icon left small>save</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols=6>
                          <v-btn v-bind:class="{ click2: clickedOnce }" text @click="deleteArticle">
                            <v-icon left small>delete</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </template>
                  </v-text-field>
                </v-card-title>
              </v-col>
            </v-row>
          </v-col> </v-row
      ></v-col>
      <v-divider vertical></v-divider>
      <v-col s="2" md="2">
        <v-card-title id="price">
          {{ article.price }} {{ currencySymbol }}
        </v-card-title>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "BoughtCard",
  emits: [],
  props: {
    ["article"]: Object,
    ["currencySymbol"]: String,
  },
  components: {},
  data() {
    return {
      showSettings: false,
      showDeleteInfo: false,
      clickedOnce: false
    };
  },
  methods: {
    deleteArticle() {
      if(this.clickedOnce){
        // delete item here
        this.clickedOnce = false;
        this.showSettings = false;
      }else{
        this.clickedOnce = true;
      }
    },
  },
};
</script>



<style scoped>
#price {
  padding: 30px;
}

#articleName {
  padding: 5px;
}

#articleInformation {
  padding: 5px;
}

.boughtCard {
  width: 100%;
}

.divider {
  margin: -1px;
}

.profile-picture {
  margin: 1em;
}

.click-1 {
  color: white;
}

.click2 {
  color: red;
}
</style>