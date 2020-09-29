<template>
  <div class="cleaning">
    <v-row xs="12" sm="12" md="6">
      <!--The event container with padding of 15-->
      <v-row class="fill-height pa-15">
        <v-col xs="12" sm="12" md="8">
          <v-sheet height="64">
            <v-toolbar flat color="rgb(177, 73, 60, 0.8)">
              <!-- Puts user back to todays date! EXAMPLE white text and orange btn prop -->
              <v-btn class="mr-4" color="black--text orange darken-1" @click="setToday">Today</v-btn>
              <v-btn fab text small color="black darken-2" @click="prev">
                <v-icon small>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab text small color="black darken-2" @click="next">
                <v-icon small>mdi-chevron-right</v-icon>
              </v-btn>
              <!-- Todays Month! in text: -->
              <v-toolbar-title v-if="$refs.calendar">{{ $refs.calendar.title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="black--text orange darken-1" v-bind="attrs" v-on="on">
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <!-- Drop Down: -->
                <v-list color="orange">
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="#b1493c"
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <!--Card that opens oon click of event:-->
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
        <!--Card on the right!, background: orange -->
        <v-card max-width="400" class="mx-auto" color="orange">
          <v-container>
              <div class="overline pa-3">Übersicht</div>
            <v-row>
         
              <v-col cols="12" sm="6">
                <v-overflow-btn
                  class="my-2"
                  :items="dropdown_font"
                  label="Open"
                  target="#dropdown-example"
                ></v-overflow-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-overflow-btn
                  class="my-2"
                  :items="dropdown_icon"
                  label="Log"
                  segmented
                  target="#dropdown-example"
                ></v-overflow-btn>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-card color="#385F73" dark>
                  <v-row class="justify-space-even">
                    <v-card-title class="headline ma-3">Bad putzen</v-card-title>
                    <v-avatar class="ma-3" size="50" tile>
                      <v-img
                        src="data:image/jpeg;base64,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"
                      ></v-img>
                    </v-avatar>
                  </v-row>
                  <v-card-subtitle>Bad Freund. Du Freund. Das Bad möchte geputzt werden. Kassiere drei Erfahrungspunkte!</v-card-subtitle>

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
                      <v-card-title class="headline" v-text="item.title"></v-card-title>
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
export default {
  data: () => ({
    // Data DropDown Open und Log:
    dropdown_font: ["Arial", "Calibri", "Courier", "Verdana"],
    dropdown_icon: [
      { text: "list", callback: () => console.log("list") },
      { text: "favorite", callback: () => console.log("favorite") },
      { text: "delete", callback: () => console.log("delete") },
    ],
    dropdown_edit: [
      { text: "100%" },
      { text: "75%" },
      { text: "50%" },
      { text: "25%" },
      { text: "0%" },
    ],
    // Dummy Data for Cards:
    items: [
      {
        color: "#315458",
        title: "Küche putzen",
        artist:
          "Die Küche möchte geputzt werden. Kassiere drei Erfahrungspunkte.",
      },
      {
        color: "#315458",
        title: "Müll rausbringen",
        artist: "Et miiieeeft! Kassiere einen Erfahrungspunkt.",
      },
    ],
    // Data for Event Calender:
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>