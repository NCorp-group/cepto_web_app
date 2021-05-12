<template>
  <div id="nav">
    <router-link to="/login">Go to login</router-link>
    <router-link to="/logs">Go to logs</router-link>
  </div>
  <router-view/>
</template>

<style>
.container {
  height: 100vh;
  width: 100vw;
}

.center-content {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>