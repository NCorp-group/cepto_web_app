<template>
  <div class="container">
    <h1>Karl Evan Brothens</h1>
    <h2>Event Logs</h2>
    <form>
      <div class="form-group">
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
      </div>
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
export default {
  name: "Light Guide Logs",
  data: () => ({ event_type: "", date: "", timestamp: "", time_since_last_event: "", events: [] }),
  methods: {
    on_refresh() {
      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => (this.info = response.data.bpi))
    },
    on_submit() {
      this.events.unshift({ event_type: this.event_type, date: this.date, timestamp: this.timestamp, time_since_last_event: this.time_since_last_event });
      this.clearForm();
    },
    clearForm() {
      this.event_type = "";
      this.date = "";
      this.timestamp = "";
      this.time_since_last_event = "";
    },
  },
};
</script>

<style>

</style>