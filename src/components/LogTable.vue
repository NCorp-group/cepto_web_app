<template>
  <div id="logs-wrapper" class="center-content">
    <div id="logs">
      <h1>Patient Name</h1>
      <h4>Event Logs</h4>
      <button class="btn" type="button" @click="on_refresh">
        Fetch
      </button>
      <button class="btn" type="button" @click="on_log">
        Log
      </button>
      <button class="btn" type="button" @click="process_api_data">
        Render
      </button>
      <button class="btn" type="button" @click="print_data">
        Log visits
      </button>
      <ul id="visit-list">
        <li v-for="(visit, i) in visits" :key="i">
          <ul id="visit-header">
            <li id="indicator" :class="visit.state"></li>
            <li class="spacer"></li>
            <li>{{ visit.datetime.toLocaleDateString('da-DK') }}</li>
            <li class="spacer"></li>
            <li>{{ visit.desc }}</li>
            <li class="spacer"></li>
            <li>{{ Math.round((visit.duration + Number.EPSILON) * 1) / 1 }} minutes</li>
            <li class="spacer"></li>
            <li>{{ visit.events.length }} events logged</li>
          </ul>
          <table id="event-list">
            <thead>
              <tr>
                <th scope="col">EventID</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
                <th scope="col">Timestamp</th>
                <th scope="col">Time since last event</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(event, j) in visits[i].events" :key="j">
                <th scope="row">{{ visits[i].events.length - j++ }}</th>
                <td>{{ event.type }}</td>
                <td>{{ event.datetime.toLocaleDateString('da-DK') }}</td>
                <td>{{ event.datetime.toLocaleTimeString('da-DK') }}</td>
                <td>{{ event.time_since_last }}</td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
//import json_data from "../assets/test_logs.js"

class Visit {
  constructor(state, id, datetime, desc, duration, events) {
      this.state = state;
      this.id = id;
      this.datetime = datetime;
      this.desc = desc;
      this.duration = duration;
      this.events = events;
  }
}

class Event {
  constructor(visit_id, type, datetime, time_since_last) {
      this.visit_id = visit_id;
      this.type = type;
      this.datetime = datetime;
      this.time_since_last = time_since_last;
  }
}

export default {
  name: "LogTable",
  data: () => ({ visits: [], api_data: null, data: {
    "events": [
        {
            "event_type": "left_bed",
            "patient_full_name": "test_patient",
            "patient_id": 2,
            "timestamp": "2021-05-12T15:45:10.000000",
            "visit_id": 1
        },
        {
            "event_type": "left_bed",
            "patient_full_name": "test_patient",
            "patient_id": 3,
            "timestamp": "2021-05-12T15:45:12.000000",
            "visit_id": 1
        },
        {
            "event_type": "left_bed",
            "patient_full_name": "test_patient",
            "patient_id": 4,
            "timestamp": "2021-05-12T15:45:26.000000",
            "visit_id": 1
        },
        {
            "event_type": "left_bed",
            "patient_full_name": "test_patient",
            "patient_id": 5,
            "timestamp": "2021-05-12T15:45:27.000000",
            "visit_id": 2
        },
        {
            "event_type": "arrived_at_bed",
            "patient_full_name": "test_patient",
            "patient_id": 5,
            "timestamp": "2021-05-16T08:51:03.000000",
            "visit_id": 2
        },
        {
            "event_type": "arrived_at_bathroom",
            "patient_full_name": "test_patient",
            "patient_id": 5,
            "timestamp": "2021-05-16T08:51:58.000000",
            "visit_id": 2
        },
        {
            "event_type": "arrived_at_bed",
            "patient_full_name": "test_patient",
            "patient_id": 5,
            "timestamp": "2021-05-16T08:52:54.000000",
            "visit_id": 3
        },
        {
            "event_type": "left_bathroom",
            "patient_full_name": "test_patient",
            "patient_id": 5,
            "timestamp": "2021-05-16T08:53:13.000000",
            "visit_id": 3
        }
    ],
    "success": true
}}),
  methods: {
    on_log() {
      console.log(this.api_data);
      //this.process_api_data();
    },
    print_data() {
      console.log(this.visits);
    },
    on_refresh() {
      //this.clear_logs();
      this.fetch_logs();
      //this.process_api_data();
    },
    clear_logs() {
      this.visits = [];
    },
    fetch_logs() {
      this.$http.command = "fetch-events";
      axios.get("http://" + this.$http.ip + ":" + this.$http.port + "/" + this.$http.command + "/" + this.$user.username + "," + this.$user.password)
        .then(response => this.api_data = response.data.events)
        .catch(error => console.log(error));
    },
    create_event(raw_event) {
      var date = new Date(raw_event.timestamp);
      var since_last = new Date(raw_event.timestamp);

      var event = new Event(
        raw_event.visit_id,
        raw_event.event_type,
        date,
        since_last.getMinutes()
      );

      return event;
    },
    process_data() {
      this.visits = [];
      console.log(this.data.events);
      console.log(this.data.events.length);
      for (let i = 0; i < this.data.events.length; i++) {
        var current_event = this.create_event(this.data.events[i]);
        console.log(current_event);
        var last_event = null;
        var events = [];

        //events.unshift(current_event);

        if (i == 0) {
          continue;
        }

        last_event = this.create_event(this.data.events[i-1]);
        console.log("current_event.visit_id = " + current_event.visit_id);
        console.log("last_event.visit_id = " + last_event.visit_id);

        while (last_event.visit_id === current_event.visit_id) {
          events.unshift(current_event);
          last_event = current_event;

          current_event = this.create_event(this.data.events[i]);
          console.log(i);
          i++;
        }

        console.log(events);

        var state = "";
        if (events.length < 4) {
          state = "incomplete";
        }
        else if (events.length == 4) {
          state = "complete";
        }
        else if (this.api_data.length === i && this.api_data[i].event_type !== "arrived_at_bed") {
          state = "in_progress";
        }
        else {
          console.log("More than 4 events in visit");
        }
        console.log(state);
        console.log(events[0].datetime.getTime());

        console.log("duration of visit: " + duration);
        var duration = events[0].datetime.getTime() - events[events.length-1].datetime.getTime();
        console.log("duration of visit: " + duration);
        var duration_date = new Date(duration);
        console.log("duration of visit: " + duration_date);
        var duration_minutes = duration_date.getTime() / 1000 / 60;
        console.log("duration of visit: " + duration_minutes);

        var current_visit = new Visit(
          state,
          events[0].visit_id,
          events[0].datetime,
          state,
          duration_minutes,
          events
        );

        this.visits.unshift(current_visit);

        events = [];
      }
    },
    create_visit(events, state) {
      var new_state = state;
      // console.log(state);
      // console.log(events[0].datetime.getTime());

      // console.log("duration of visit: " + duration);
      var duration = events[0].datetime.getTime() - events[events.length-1].datetime.getTime();
      // console.log("duration of visit: " + duration);
      var duration_date = new Date(duration);
      // console.log("duration of visit: " + duration_date);
      var duration_minutes = duration_date.getTime() / 1000 / 60;
      // console.log("duration of visit: " + duration_minutes);

      var visit = new Visit(
        new_state,
        events[0].visit_id,
        events[0].datetime,
        new_state,
        duration_minutes,
        events
      );

      return visit
    },
    process_api_data() {
      var visit_ids = this.api_data.map(function(event) { return event.visit_id});
      var visit_id_set = new Set(visit_ids);
      console.log(visit_id_set);

      // var visits = [];
      visit_id_set.forEach(visit_id => {
        var events = [];
        events = this.api_data.filter(event => event.visit_id === visit_id).map(
          event => {
            console.log(event);
            let { event_type, timestamp } = event;
            // console.log(vid + event_type + timestamp + duration);
            console.log(visit_id + event_type + timestamp);
            let new_event = this.create_event(event);
            console.log(new_event);
            return new_event;
          }
        ).reverse();
        console.log(events);
        // resolve state
        var state = "";
        if (events[events.length-1].event_type !== "arrived_at_bed") {
          state = "in_progress";
        }
        else if (events.length < 4) {
          state = "incomplete";
        }
        else if (events.length == 4) {
          state = "complete";
        }

        this.visits.unshift(this.create_visit(events, state));
      });

      // this.visits = [];
      // var events = [];
      // var last_event = null;
      // var current_visit = null;

      // // console.log(this.api_data);
      // // console.log(this.api_data.length);
      // let i = 0;
      //  while (i < this.api_data.length) {
      //   var current_event = this.create_event(this.api_data[i]);

      //   // console.log(current_event);

      //   // events.unshift(current_event);

      //   if (last_event == null) {
      //     events.unshift(current_event);
      //     i++;

      //     last_event = current_event;
      //     // current_visit = this.create_visit(events, i);
      //   }
      //   else {
      //     // last_event = this.create_event(this.api_data[i-1]);
      //     // console.log("current_event.visit_id = " + current_event.visit_id);
      //     // console.log("last_event.visit_id = " + last_event.visit_id);

      //     while (last_event.visit_id === current_event.visit_id && i < this.api_data.length) {
      //       events.unshift(current_event);
      //       // if (i >= this.api_data.length) {
      //       //   i--;
      //       //   break;
      //       // }
      //       last_event = current_event;

      //       current_event = this.create_event(this.api_data[i]);
      //       // console.log(i);
      //       i++;
      //     }

      //     // console.log(events, i);

      //     current_visit = this.create_visit(events);

      //     this.visits.unshift(current_visit);
      //     events = [];
      //   }
      // }
    }
  },
  mounted() {
    setInterval(this.fetch_logs(), 5000);
  }
};
</script>

<style scoped>
#logs-wrapper {
  flex-grow: 5;
}
#logs {
  padding: 0px 200px;
  width: 100%;
  text-align: left;
  color: #F6F6F6;
}

/* VISIT COMPONENTS */
#visit-list, #event-list {
  list-style: none;
  padding: 0;
}
#visit-list > li {
  background-color: #272727;
  border-radius: 10px;
  box-shadow: 0 3px 6px #191919;
  overflow: hidden;
  margin: 20px 0;
}
#visit-header {
  width: 100%;
  box-sizing: border-box;
  background-color: #2F2F2F;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  font-size: 22px;
}
#visit-header li {
  list-style-type: none;
  margin: 0 30px 0 0;
}
.spacer {
  background-color: #707070;
  height: 28px;
  width: 2px;
}
#indicator {
  min-width: 26px;
  min-height: 26px;
  max-width: 26px;
  max-height: 26px;
  border-radius: 50%;
  background-color: #00CEF9;
  border: 2px solid #00CEF9;
}
.complete {
  background-color: #19F900;
  border: 2px solid #19F900;
}
.incomplete {
  background-color: #F90000;
  border: 2px solid #F90000;
}
.in_progress {
  background-color: #00CEF9;
  border: 2px solid #00CEF9;
}

/* EVENT LIST */
#event-list {
  padding: 20px 15px;
}
#event-list tr {
  padding: 5px 0 0 0;
}
#event-list td, #event-list th {
  padding: 0 10px;
}
button {
  margin: 30px 10px 20px 0px;
}
</style>