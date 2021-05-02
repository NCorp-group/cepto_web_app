<template>
  <div id="table" class="container">
    <h1>Karl Evan Brothens</h1>
    <h4>Event Logs</h4>
    <form>
      <!-- <div class="form-group">
        <label for="event_type">Event</label>
        <input
          type="text"
          placeholder="Left bed"
          v-model="event_type"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="date">Date</label>
        <input
          type="text"
          placeholder="Tue Apr 20 2021"
          v-model="date"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="timestamp">Timestamp</label>
        <input
          type="text"
          placeholder="10:23:27 PM"
          v-model="timestamp"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="time_since_last_event">Time Since Last Event</label>
        <input
          type="text"
          placeholder="6 min"
          v-model="time_since_last_event"
          class="form-control"
        />
      </div> -->
      <button type="button" @click="on_refresh" class="btn btn-dark">
        Refresh
      </button>
    </form>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">EventID</th>
          <th scope="col">Event</th>
          <th scope="col">Date</th>
          <th scope="col">Timestamp</th>
          <th scope="col">Time since last event</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, i) in events" :key="i">
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
  data: () => ({ event_type: "", date: "", timestamp: "", time_since_last_event: "", events: [], api_data: null }),
  methods: {
    on_refresh() {
      this.clear_logs();
      this.fetch_logs();
      this.process_api_data();
    },
    clear_logs() {
      this.events = [];
    },
    clearForm() {
      this.event_type = "";
      this.date = "";
      this.timestamp = "";
      this.time_since_last_event = "";
    },
    fetch_logs() {
      axios.get('https://localhost:5001/FetchEvents/%7B%22session_token%22:%22601bc973-da4d-47cc-b3eb-4eb7c921bc48%22%7D')
           .then(response => (this.api_data = response.data))
           .catch(error => console.log(error));
    },
    process_api_data() {
      for (let i = 0; i < this.api_data.events.length; i++) {
        let new_event_type = this.api_data["events"][i].event_type;
        console.log(new_event_type);
        let new_date = this.api_data["events"][i].time;
        console.log(new_date);
        let new_timestamp = this.api_data["events"][i].time;
        console.log(new_timestamp);
        let new_time_since_last_event = this.api_data["events"][i].time_since_last;
        console.log(new_time_since_last_event);
        this.events.unshift({ event_type: new_event_type, date: new_date, timestamp: new_timestamp, time_since_last_event: new_time_since_last_event });
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