<template>
  <div id="logs-wrapper" class="center-content">
    <div id="logs">
      <h1>Patient Name</h1>
      <h4>Event Logs</h4>
      <button class="btn" type="button" @click="process_data">
        Refresh
      </button>
      <button class="btn" type="button" @click="print_data">
        Print visits
      </button>
      <ul id="visit-list">
        <li v-for="(visit, i) in visits" v-bind:key="i">
          <div id="visit-header">
            {{ visit.id }}
          </div>
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
              <tr v-for="(event, j) in visits[i].events" v-bind:key="j">
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
      <!-- <table class="table mt-5">
        <thead>
          <tr>
            <th scope="col">VisitID</th>
            <th scope="col">EventID</th>
            <th scope="col">Event Type</th>
            <th scope="col">Date</th>
            <th scope="col">Timestamp</th>
            <th scope="col">Time since last event</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(visit, i) in visits" :key="i">
            <th scope="row">{{ visits.length - i++ }}</th>
            <tbody>
              <tr v-for="(event, j) in visits[i].events" :key="j">
                <th scope="row">{{ visits[i].events.length - i++ }}</th>
                <td>{{ event.type }}</td>
                <td>{{ event.datetime.toLocaleDateString('da-DK') }}</td>
                <td>{{ event.datetime.toLocaleDateString('da-DK') }}</td>
                <td>{{ event.time_since_last }}</td>
              </tr>
            </tbody>
          </tr>
        </tbody>
      </table>  -->
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
      this.process_api_data();
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
          events[0].date,
          state,
          duration_minutes,
          events
        );

        this.visits.unshift(current_visit);

        events = [];
      }
    },
    process_api_data() {
      for (let i = 0; i < this.api_data.length; i++) {
        var last_event = null;
        var events = null;
        if (last_event == null) {
          continue;
        }
        while (last_event.visit_id === current_event.visit_id || i == 0) {

          var current_date = new Date(this.api_data[i].time);
          var current_since_last = new Date(this.api_data[i].time_since_last);

          var current_event = Event(
            this.api_data[i].event_type,
            current_date,
            current_since_last.getMinutes()
          );

          events.unshift(current_event);

          last_event = current_event;

          i++;
        }

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

        var duration = events[1].datetime.getTime() - events[events.length].datetime.getTime();
        var duration_date = new Date(duration);
        var duration_minutes = duration_date.getTime() / 1000 / 60;

        var current_visit = new Visit(
          state,
          events[0].visit_id,
          events[0].date,
          state,
          duration_minutes,
          events
        );

        this.visits.unshift(current_visit);

        events = [];
      }

      /*
      for (let i = 0; i < this.api_data.length; i++) {
        // Initialisation
        var last_event = null;
        if (i > 0) {
          last_event = this.api_data[i-1];
        }
        var current_event = this.api_data[i];

        // Per visit loop
        var current_visit = [];
        while (current_event.visit_id !== last_event.visit_id) {
          
        }
      }
      */
      
      /*
      // var current_visit_id = 0;
      for (let i = 0; i < this.api_data.length; i++) {
        // Initialisation
        var last_event = null;
        if (i > 0) {
          last_event = this.api_data[i-1];
        }
        var current_event = this.api_data[i];

        // if (current_event.visit_id !== last_event.visit_id) {
        //   current_visit_id++;
        // }

        // Processing
        var current_event_type = current_event.event_type;
        //console.log(new_event_type);

        // first timestamp
        // for absolute date and time
        var current_date_str = current_event.time;
        var date_obj = new Date(current_date_str);
        //console.log("This is the date: " + date_obj.toLocaleDateString('da-DK'));

        var current_date = date_obj.toLocaleDateString('da-DK');
        //console.log(new_date);

        var current_timestamp = date_obj.toLocaleTimeString('da-DK');
        //console.log(new_timestamp);

        // second timestamp
        // for the relative time since last event
        // ACTUAL CODE var since_last_date_str = current_event.time;
        // ACTUAL CODE var since_last_date_obj = new Date(since_last_date_str);
        //console.log("Since last time: " + since_last_date_obj);

        // compute time since last event.
        
        // last timestamp
        // for relative time later
        
        var current_time_since_last_event = "-";
        if (i > 0) {
          var last_date_obj = new Date(last_event.time);
          //console.log(last_date_obj.getMinutes());
          // ACTUAL CODE
          // new_time_since_last_event = date_obj.getMinutes() - last_date_obj.getMinutes();
          //TEST CODE
          current_time_since_last_event = last_date_obj.getMinutes();
        }
        //console.log(new_time_since_last_event);

        this.events.unshift({
          event_type: current_event_type,
          date: current_date,
          timestamp: current_timestamp,
          time_since_last_event: current_time_since_last_event
        });
      }
      */
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
  /* height: 100%; */
  padding: 0px 200px;
  width: 100%;
  text-align: left;
  color: #F6F6F6;
  /* position: absolute; */
  /* margin-left: 200px; */
}
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
#visit-list > li > div {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
}
#visit-header {
  background-color: #2F2F2F;
  border-radius: 10px;
}
#event-list {
  padding: 5px 20px 20px 20px;
}
#event-list > tbody > tr {
  padding: 5px 0 0 0;
}
button {
  margin: 30px 10px 20px 0px;
}
/* table > td {
  padding: 5px;
} */
</style>