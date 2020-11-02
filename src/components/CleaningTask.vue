<template>
  <!--Card on the right!, background: orange -->


      <v-row dense class="paddingCards">
        <v-col cols="12">
          <v-card class="cleaningCards">
            <v-card-title class="headline">{{ item.title }}</v-card-title>
            <v-card-subtitle>{{ item.description }} </v-card-subtitle>
            <v-card-actions>
              <v-col class="text-right">
                <v-btn text>
                  <v-icon @click="acceptTask(item)">mdi-check</v-icon>
                </v-btn>
                 <v-btn text>
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>


</template>

<script>

export default {
  name: "CleaningTask",
  emits: [],
  props: {
    ["item"]: Object,
    ["currentUser"]: Object,
  },
  components: {
  },
  data() {
    return {
      mycolor: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
      // Dummy Data for Cards:
    };
  },
  methods: {
    // Color generator:
    generator: function () {
      this.mycolor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
    },
    acceptTask(item) {
      item.status = 1;
      item.acceptedBy = this.currentUser.username;
      console.log(item.status);

    }
  },
};
</script>

<style>

.cleaningCards {
  width: 100%;
}

</style>