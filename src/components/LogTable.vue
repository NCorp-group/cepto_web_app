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
        Render API data
      </button>
      <button class="btn" type="button" @click="process_data">
        Render test data
      </button>
      <button class="btn" type="button" @click="print_data">
        Log visits
      </button>
      <ul id="visit-list">
        <li v-for="(visit, i) in visits" :key="i">
          <ul id="visit-header">
            <li id="indicator" :class="visit.state"></li>
            <li class="spacer"></li>
            <li>{{ visit.timestamp.toLocaleDateString('da-DK') }}</li>
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
                <th scope="col">Minutes since last event</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(event, j) in visits[i].events" :key="j">
                <th scope="row">{{ visits[i].events.length - j++ }}</th>
                <td>{{ event.desc }}</td>
                <td>{{ event.timestamp.toLocaleDateString('da-DK') }}</td>
                <td>{{ event.timestamp.toLocaleTimeString('da-DK') }}</td>
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

class Visit {
  constructor(state, id, timestamp, desc, duration, events) {
      this.state = state;
      this.id = id;
      this.timestamp = timestamp;
      this.desc = desc;
      this.duration = duration;
      this.events = events;
  }
}

class Event {
  constructor(visit_id, type, desc, timestamp, time_since_last) {
      this.visit_id = visit_id;
      this.type = type;
      this.desc = desc;
      this.timestamp = timestamp;
      this.time_since_last = time_since_last;
  }
}

const map_adjacent = (mapping, array) => {
  const {length} = array, size = length, result = new Array(size);
  for (let i = 0; i < size; i++) result[i] = mapping(array[i-1], array[i]);
  return result;
}

// Snake case to title case
// https://www.codegrepper.com/code-examples/javascript/snake+case+to+title+case+javascript
function snake_to_title_case(string) {
  let sentence = string.toLowerCase().split("_");
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  
  return sentence.join(" ");
}

export default {
  name: "LogTable",
  data: () => ({ visits: [], api_data: null, data: {
    "events": [
        {
            "event_type": "left_bed",
            "patient_full_name": "test_patient",
            "patient_id": 1,
            "timestamp": "2021-05-12T15:45:10.000000",
            "visit_id": 1
        },
        {
            "event_type": "arrived_at_bathroom",
            "patient_full_name": "test_patient",
            "patient_id": 1,
            "timestamp": "2021-05-12T15:45:36.000000",
            "visit_id": 1
        },
        {
            "event_type": "left_bathroom",
            "patient_full_name": "test_patient",
            "patient_id": 1,
            "timestamp": "2021-05-12T15:48:26.000000",
            "visit_id": 1
        },
        {
            "event_type": "arrived_at_bed",
            "patient_full_name": "test_patient",
            "patient_id": 1,
            "timestamp": "2021-05-12T15:49:01.000000",
            "visit_id": 1
        },
        {
            "event_type": "left_bed",
            "patient_full_name": "test_patient",
            "patient_id": 1,
            "timestamp": "2021-05-16T08:51:03.000000",
            "visit_id": 2
        },
        {
            "event_type": "arrived_at_bed",
            "patient_full_name": "test_patient",
            "patient_id": 1,
            "timestamp": "2021-05-16T08:56:58.000000",
            "visit_id": 2
        },
        {
            "event_type": "left_bed",
            "patient_full_name": "test_patient",
            "patient_id": 1,
            "timestamp": "2021-05-16T23:52:54.000000",
            "visit_id": 3
        },
        {
            "event_type": "arrived_at_bathroom",
            "patient_full_name": "test_patient",
            "patient_id": 1,
            "timestamp": "2021-05-16T23:53:13.000000",
            "visit_id": 3
        },
        {
            "event_type": "left_bathroom",
            "patient_full_name": "test_patient",
            "patient_id": 1,
            "timestamp": "2021-05-17T00:04:45.000000",
            "visit_id": 3
        },
        {
            "event_type": "arrived_at_bed",
            "patient_full_name": "test_patient",
            "patient_id": 1,
            "timestamp": "2021-05-17T00:05:56.000000",
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
    create_visit(events) {
      // console.log(events[0]);
      let duration = events[0].timestamp.getTime() - events[0].timestamp.getTime();
      let duration_date = new Date(duration);
      let duration_minutes = duration_date.getTime() / 1000 / 60;

      // console.log("MINUTES: " + duration_minutes);
      let state = "";
      let desc = "";
      console.log(events[events.length-1]);
      if (events[0].type !== "arrived_at_bed") {
        state = "in_progress";
        desc = "In progress";
      }
      else if (events.length < 4) {
        state = "incomplete";
        desc = "Returned to bed";
      }
      else if (events.length == 4) {
        state = "complete";
        desc = "Successful visit"
      }

      let visit = new Visit(
        state,
        events[0].visit_id,
        events[0].timestamp,
        desc,
        duration_minutes,
        events
      );

      // console.log(visit);

      return visit
    },
    process_data() {
      this.visits = [];

      if (this.data.events == null) {
        console.log("No data to show yet.");
        return;
      }

      // Extract visit ids from all events
      let visit_ids = this.data.events.map(function(event) { return event.visit_id });
      // Create set of the visit ids
      let visit_id_set = new Set(visit_ids);

      // For each visit id create a visit to log
      visit_id_set.forEach(visit_id => {
        let events_of_visit_id = this.data.events.filter(event => event.visit_id === visit_id);

        // ADJACENT MAP to refer to last element
        let events = map_adjacent((event1, event2) => {

          let date2 = new Date(event2.timestamp);
          
          let duration = "";
          if (event1 == null) {
            duration = "-";
          }
          else {
            let date1 = new Date(event1.timestamp);
            let diff = date2.getTime() - date1.getTime();
            let minutes = Math.floor(diff / 1000 / 60);
            let seconds = Math.floor(diff/1000 - minutes * 60);
            duration += minutes + " min " + seconds + " sec";
          }

          let new_event = new Event(
            visit_id,
            event2.event_type,
            snake_to_title_case(event2.event_type),
            date2,
            duration
          );
          // console.log(new_event);
          return new_event;
        }, events_of_visit_id).reverse();
        // console.log(events);

        // resolve state

        this.visits.unshift(this.create_visit(events));
        // console.log(this.visits);
      });
    },
    process_api_data() {
      if (this.api_data == null) {
        console.log("No data to show yet.");
        return;
      }

      var visit_ids = this.api_data.map(function(event) { return event.visit_id});
      var visit_id_set = new Set(visit_ids);

      visit_id_set.forEach(visit_id => {
        var events = [];
        events = this.api_data.filter(event => event.visit_id === visit_id).map(
          event => {
            let new_event = this.create_event(event);
            return new_event;
          }
        ).reverse();

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
  margin: 0 20px 0 0;
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