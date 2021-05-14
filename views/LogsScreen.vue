<template>
  <div id="flex-wrapper" class="full-screen">
    <SidePanel/>
    <LogTable/>
  </div>
</template>

<script>
import LogTable from '../src/components/LogTable'
import SidePanel from '../src/components/SidePanel'

export default {
  name: 'LoginScreen',
  components: {
    LogTable,
    SidePanel
  }
}
</script>

<style scoped>
#flex-wrapper {
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  /* flex-wrap: nowrap; */
}
</style>