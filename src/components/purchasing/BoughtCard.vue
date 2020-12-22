<template>
  <v-card class="boughtCard" height="130px">
    <v-row align="center"
      justify="center" no-gutters>
      <v-col s="9" md="9">
        <v-row>
          <v-col md="3">
            <v-img
              class="profile-picture rounded-circle"
              width="65"
              max-width="65"
              max-height="65"
              v-bind:src="article.avatar"
            ></v-img>
          </v-col>
          <v-col md="9">
            <v-row no-gutters>
              <v-card-title id="articleName"
                >{{ article.name }}
                <v-btn text>
                  <v-icon small @click="console.log('ddd')">edit</v-icon>
                </v-btn>
              </v-card-title>
            </v-row>
            <v-row no-gutters>
                <v-card-text id="articleInformation">
                {{article.purchasedBy}}
                <span v-if="article.comment != ''"> - {{article.comment}} </span>
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
    return {};
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

#articleInformation{
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
</style>