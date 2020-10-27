<template>
  <div class="cleaning">
    <v-row xs="12" sm="12" md="6">
      <!--The event container with padding of 15-->
      <v-row class="fill-height pa-15">
        <CleaningCalendar> </CleaningCalendar>
        <!--Card on the right!, background: orange -->
        <v-card max-width="400" class="mx-auto" color="rgb(180, 230, 80, 0.2)">
          <v-container>
            <v-row>
              <v-col cols="6" sm="6" md="6">
                <v-overflow-btn
                  class="rgb(177, 73, 60, 1) px-auto"
                  :items="dropdown_icon"
                  label="Open"
                  segmented
                  target="#dropdown-example"
                ></v-overflow-btn>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-overflow-btn
                  class="rgb(177, 73, 60, 0.8) px-auto"
                  :items="dropdown_icon"
                  label="Log"
                  segmented
                  target="#dropdown-example"
                ></v-overflow-btn>
              </v-col>
            </v-row>
            <div class="overline pa-3 white--text">Übersicht</div>
            <v-row dense>
              <v-col cols="12">
                <v-card color="#385F73" dark>
                  <v-card-title class="headline">Bad putzen</v-card-title>
                  <v-card-subtitle
                    >Bad Freund. Du Freund. Das Bad möchte geputzt werden.
                    Kassiere drei Erfahrungspunkte!</v-card-subtitle
                  >
                  <v-card-actions>
                    <v-col class="text-right">
                      <v-btn text>
                        <v-icon>arrow_right_alt</v-icon>
                      </v-btn>
                    </v-col>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col v-for="(item, i) in items" :key="i" cols="12">
                <v-card :color="item.color" dark>
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title
                        class="headline"
                        v-text="item.title"
                      ></v-card-title>
                      <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                    </div>

                    <!--
 <v-avatar class="ma-3" size="125" tile>
                      <v-img :src="item.src"></v-img>
                    </v-avatar>

                    -->
                  </div>
                  <v-card-actions>
                    <v-col class="text-right">
                      <v-btn text>
                        <v-icon>arrow_right_alt</v-icon>
                      </v-btn>
                      <v-btn text>
                        <v-icon>notifications</v-icon>
                      </v-btn>
                    </v-col>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import CleaningCalendar from "../CleaningCalendar";

export default {
  components: {
    CleaningCalendar,
  },
};
</script>