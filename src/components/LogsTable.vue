<template>
  <div id="logs-wrapper" class="center-content">
    <div id="logs">
      <div id="logs-header">
        <h1>Patient Name</h1>
        <h4>Event Logs</h4>
      </div>
      <!-- Debug buttons. Deprecated. -->
      <!-- <button class="btn" type="button" @click="on_refresh">
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
      </button> -->
      <!-- Outer list of visits -->
      <ul id="visit-list">
        <li v-for="(visit, i) in visits" :key="i">
          <!-- Data for each visit structured in linear list -->
          <ul id="visit-header">
            <li id="indicator" :class="[ visit.state, { in_progress: visit.in_progress } ]"></li>
            <li class="spacer"></li>
            <li>{{ visit.timestamp.toLocaleDateString('da-DK') }}</li>
            <li class="spacer"></li>
            <li>{{ visit.desc }}</li>
            <li class="spacer"></li>
            <li>{{ visit.duration }}</li>
            <li class="spacer"></li>
            <li>{{ visit.events.length }} events logged</li>
          </ul>
          <!-- Table of events for each visit -->
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
// Pre-declared visit class, holds all information pertaining to a visit,
// processed from raw data, fetched from the API, including a list of events
class Visit {
  constructor(state, id, timestamp, desc, duration, events, in_progress) {
      this.state = state;             // State of the visit, determines colour of indicator
      this.id = id;                   // The visit's ID
      this.timestamp = timestamp;     // Datetime object for the start of the visit
      this.desc = desc;               // Description for the visit
      this.duration = duration;       // Duration of the visit
      this.events = events;           // List of events pertaining to visit
      this.in_progress = in_progress; // Determines how to render indicator
  }
}
// Pre-declared event class, holds all data pertaining to a single event,
// data processed from raw json, fetched from the API
class Event {
  constructor(visit_id, type, desc, timestamp, time_since_last) {
      this.visit_id = visit_id;               // Determines which visit the event is part of
      this.type = type;                       // The kind of event
      this.desc = desc;                       // Event description
      this.timestamp = timestamp;             // Datetime object for the occurance of the event
      this.time_since_last = time_since_last; // Duration since last event - string
  }
}
// Adjacent map functionality
// Applies a mapping function to adjacent objects in an array
const map_adjacent = (mapping, array) => {
  const {length} = array, size = length, result = new Array(size);
  for (let i = 0; i < size; i++) result[i] = mapping(array[i-1], array[i]);
  return result;
}
// Snake case to title case
// https://www.codegrepper.com/code-examples/javascript/snake+case+to+title+case+javascript
// Used to split at " ", now splits at "_"
function snake_to_title_case(string) {
  let sentence = string.toLowerCase().split("_");
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(" ");
}
// Vue component export
export default {
  name: "LogTable",
  data: () => ({
    visits: [],     // List of visit instances
    api_data: null, // Data fetched from the CEPTO Web API
    data: {         // Mock data for testing purposes
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
        },
        {
          "event_type": "left_bed",
          "patient_full_name": "test_patient",
          "patient_id": 1,
          "timestamp": "2021-05-18T09:21:43.000000",
          "visit_id": 4
        },
        {
          "event_type": "left_bed",
          "patient_full_name": "test_patient",
          "patient_id": 1,
          "timestamp": "2021-05-18T09:23:43.000000",
          "visit_id": 5
        },
        {
          "event_type": "left_bed",
          "patient_full_name": "test_patient",
          "patient_id": 1,
          "timestamp": "2021-05-18T09:34:43.000000",
          "visit_id": 6
        },
        {
          "event_type": "left_bed",
          "patient_full_name": "test_patient",
          "patient_id": 1,
          "timestamp": "2021-05-18T10:21:43.000000",
          "visit_id": 7
        }
      ],
      "success": true
    }
}),
  methods: {
    // Fetch from API
    // Makes HTTP GET request to the CEPTO Web API with the current users username and password,
    // this way the given caregiver will only receive logs for the patient(s) they are attached to.
    fetch_logs() {
      this.$http.command = "fetch-events";
      axios.get("http://" + this.$http.ip + ":" + this.$http.port + "/" + this.$http.command + "/" + this.$user.username + "," + this.$user.password)
        .then(response => {
          this.api_data = response.data.events; // Place the events list from the response into api_data
        })
        .catch(error => console.log(error));
    },
    // Creates an Event class instance
    // Takes raw json object and conforms to proper datatypes
    // Returns Event instance
    // DEPRECATED as an adjacent map is necessary for time_since_last
    create_event(raw_event) {
      // Date instances needed for later timezone conversion
      // as all data from API is in UTC+0
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
    // Creates Visit class instance
    // Takes a list of events that are found to be in the visit
    // Processes the data from the list of events to derive more user friendly data for the visit
    // Returns Visit instance
    create_visit(events) {
      // Find duration of visit in minutes and seconds
      let diff = events[0].timestamp.getTime() - events[events.length-1].timestamp.getTime();
      let minutes = Math.floor(diff/1000/60);
      let seconds = Math.floor(diff/1000 - minutes*60);
      // Reseolve visitstate and description
      let state = "";
      let desc = "";
      let in_progress = false;
      // Case: #events < 4, the patient must not have gone to the bathroom
      if (events.length < 4) {
        state = "incomplete";
        desc = "Returned to bed";
        // Deprecated cases, handled in next if statement
        // // Case: The patient left the bed and returned again
        // if (events[0].type === "arrived_at_bed") {
        //   desc = "Returned to bed";
        // }
        // // Case: The patient has not come back to bed yet
        // else {
        //   desc = "Incomplete visit";
        // }
      }
      // Case: The patient went to the bathroom and back again successfully
      else if (events.length == 4) {
        state = "complete";
        desc = "Successful visit"
      }
      // Case: The Patient has not come back to bed yet
      if (events[0].type !== "arrived_at_bed") {
        in_progress = true;
        desc = "In progress";
        // As the visit has not yet finished, the date should be calculated from the current time
        // This way we also get a simple timer on screen
        diff = (new Date()).getTime() - events[events.length-1].timestamp.getTime();
        minutes = Math.floor(diff/1000/60);
        seconds = Math.floor(diff/1000 - minutes*60);
      }
      // Assemble duration string
      let duration = minutes + " min " + seconds + " sec";
      // Case: The visit has taken over 30 min, thus the caregiver should be "notified" with an indicator
      if (minutes >= 30) {
        state = "failed";
        desc = "Failed bathroom visit";
      }
      let visit = new Visit(
        state,
        events[0].visit_id,
        events[0].timestamp,
        desc,
        duration,
        events,
        in_progress
      );
      return visit
    },
    // Processes test data
    // Does the same as process_api_data but for internal date object.
    // DEPRECATED
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
            let minutes = Math.floor(diff/1000/60);
            let seconds = Math.floor(diff/1000 - minutes * 60);
            duration += minutes + " min " + seconds + " sec";
          }
          return new Event(
            visit_id,
            event2.event_type,
            snake_to_title_case(event2.event_type),
            date2,
            duration
          );
        }, events_of_visit_id).reverse();
        this.visits.unshift(this.create_visit(events));
      });
    },
    // Processes API data
    // Iterates through the internal api_data variable holding the most recent data from the CEPTO Web API
    // Determines visits and events for each visit
    // Processes data ready to render to the DOM through the bound visit list
    process_api_data() {
      // Clear all previous visits
      this.visits = [];
      // Case: No data is received from the API
      // This could be due to the API being down, or somehow giving undefined or null data
      if (this.api_data == null) {
        console.log("No data to show yet.");
        return;
      }
      // Extract visit ids from all events
      let visit_ids = this.api_data.map(function(event) { return event.visit_id });
      // Create set of the visit ids
      let visit_id_set = new Set(visit_ids);
      // For each visit id in the set create a visit to log
      visit_id_set.forEach(visit_id => {
        // Find all events with the current visit id, and place the raw data in this events_of_visit_id array
        let events_of_visit_id = this.api_data.filter(event => event.visit_id === visit_id);
        // ADJACENT MAP to refer to previous element
        // Purpose is to be able to refer to timestamp of previous event, and as such calculate the time since the previous event occured
        let events = map_adjacent((event1, event2) => {
          
          let date2 = new Date(event2.timestamp);
          let duration = "";
          // Case: First iteration - looking at null and the first event in the list
          if (event1 == null) {
            duration = "-"; // Time since previous event should just be indicated with a null "-" entrance to the table
          }
          // Case: There is a previous event
          else {
            let date1 = new Date(event1.timestamp);
            // Calculate time since previous event in minutes and seconds
            let diff = date2.getTime() - date1.getTime();
            let minutes = Math.floor(diff/1000/60);
            let seconds = Math.floor(diff/1000 - minutes * 60);
            // Assemble the furation string to render
            duration += minutes + " min " + seconds + " sec";
          }
          // As such for each event with a visit id of the current visit (hence events in events_of_visit_id)
          // return an Event class instance
          return new Event(
            visit_id,
            event2.event_type,
            snake_to_title_case(event2.event_type),
            date2,
            duration
          );
        }, events_of_visit_id).reverse(); // Reverses the output event list as this will be more user friendly and intuitive to read when rendered
        // Pushes the most recent visit to the front of the internal visits array
        // Thus the most recent visit will be at the top of the renders list of visits
        this.visits.unshift(this.create_visit(events));
      });
    }
  },
  mounted() {
    setInterval(() => { this.fetch_logs() }, 1000);       // Fetch events from API asynchronously from processing the fetched data
    setInterval(() => { this.process_api_data() }, 1000); // Process the fetched API data every second
    //setInterval(() => { this.process_data() }, 1000);   // DEPRECATED used to render test data
  }
};
</script>

<style scoped>
#logs-wrapper {
  flex-grow: 5;
}
#logs {
  /* padding: 0px 200px; */
  min-width: 800px;
  text-align: left;
  color: #F6F6F6;
  display: flex;
  flex-direction: column;
}
#logs-header {
  padding: 0 50px;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
/* SCROLLBAR */
/* width */
::-webkit-scrollbar {
  width: 10px;
  /* right: -10px !important; */
  /* left: -10px; */
}
/* Track */
::-webkit-scrollbar-track {
  background: transparent;
  padding-right: 5px; 
  /* border: solid 2px black; */
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #2F2F2F;
  border-radius: 5px;
  box-shadow: 0 3px 6px #191919;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #272727; 
}
/* VISIT COMPONENTS */
#visit-list {
  list-style: none;
  max-width: 1200px;
  padding: 0 50px;
  height: 100%;
  overflow: auto;
  margin: 0;
}
#event-list {
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
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;
  border-radius: 50%;
  background-color: #00CEF9;
  border: 2px solid #00CEF9;
}
.in_progress.complete {
  background-color: transparent !important;
  border: 2px solid #19F900 !important;
}
.in_progress.incomplete {
  background-color: transparent !important;
  border: 2px solid #00CEF9 !important;
}
.in_progress.failed {
  background-color: transparent !important;
  border: 2px solid #F90000 !important;
}
.complete {
  background-color: #19F900 !important;
  border: 2px solid #19F900 !important;
}
.incomplete {
  background-color: #00CEF9 !important;
  border: 2px solid #00CEF9 !important;
}
.failed {
  background-color: #F90000 !important;
  border: 2px solid #F90000 !important;
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