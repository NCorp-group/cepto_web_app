<template>
  <div id="table" class="container">
    <h1>Patient Name</h1>
    <h4>Event Logs</h4>
    <button type="button" @click="on_refresh" class="btn btn-dark">
      Refresh
    </button>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">VisitID</th>
          <th scope="col">EventID</th>
          <th scope="col">Event</th>
          <th scope="col">Date</th>
          <th scope="col">Timestamp</th>
          <th scope="col">Time since last event</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, i) in visits" :key="i">
          <th scope="row">{{ visits.length - i++ }}</th>
          <tbody>
            <tr v-for="(entry, j) in visits[i]" :key="j">
              <th scope="row">{{ visits[i].length - i++ }}</th>
              <td>{{ entry.event_type }}</td>
              <td>{{ entry.date }}</td>
              <td>{{ entry.timestamp }}</td>
              <td>{{ entry.time_since_last_event }}</td>
            </tr>
          </tbody>
        </tr>
        <tr v-for="(entry, i) in events" :key="i">
          <td>{{ entry.visit_id }}</td>
          <th scope="row">{{ events.length - i++ }}</th>
          <td>{{ entry.event_type }}</td>
          <td>{{ entry.date }}</td>
          <td>{{ entry.timestamp }}</td>
          <td>{{ entry.time_since_last_event }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "event-table",
  data: () => ({ event_type: "", date: "", timestamp: "", time_since_last_event: "", events: [], visits: [], api_data: null }),
  methods: {
    on_refresh() {
      //this.clear_logs();
      this.fetch_logs();
      this.process_api_data();
    },
    clear_logs() {
      this.events = [];
    },
    fetch_logs() {
      axios.get('https://localhost:5001/FetchEvents/%7B%22session_token%22:%22601bc973-da4d-47cc-b3eb-4eb7c921bc48%22%7D')
        .then(response => this.api_data = response.data.events)
        .catch(error => console.log(error));
      console.log(this.api_data);
    },
    process_api_data() {
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

        this.events.unshift({event_type: current_event_type, date: current_date, timestamp: current_timestamp, time_since_last_event: current_time_since_last_event });
      }
    }
  },
  mounted() {
    this.fetch_logs();
    this.process_api_data();
  },
};
</script>

<style>
#table {
  height: 100%;
  flex-grow: 2;
  padding: 0px 200px;
  text-align: left;
  color: #F6F6F6;
  position: absolute;
  margin-left: 200px;
}
button {
  margin: 30px 10px 20px 0px;
  padding: 10px 15px;
  border-style: none;
}
table > td {
  padding: 5px;
}
</style>