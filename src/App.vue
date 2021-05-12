<template>
  <LoginScreen/>
  <Table/>
  <SidePanel/>
</template>

<script>
import Table from './components/LogTable.vue'
import SidePanel from './components/SidePanel.vue'
import LoginScreen from './components/LoginScreen.vue'

export default {
  name: 'App',
  components: {
    Table,
    SidePanel,
    LoginScreen
  }
}
</script>

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