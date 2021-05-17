<template>
  <div id="sidepanel">
    <div id="user-list">
      <h2>Patients</h2>
      <h4>User List</h4>
    </div>
    <div id="options-panel">
      <router-link to="/login">
        <button class="btn full-width">Sign Out</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
#sidepanel {
  position: relative;
  flex-grow: 1;
  max-width: 250px;
  background-color: #2F2F2F;
  box-shadow: 0px 0px 8px 0px black;
  padding: 30px;
  margin: 0;
  display: flex;
  flex-direction: column;
}
#user-list {
  flex-grow: 5;
}
#options-panel {
  flex-grow: 1;
}
</style>