<template>
  <div class="full-screen flex-row-start">
    <SidePanel/>
    <LogTable/>
  </div>
</template>

<script>
import LogTable from '../src/components/LogsTable'
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

</style>