<template>
  <Table/>
  <SidePanel/>
</template>

<script>
import Table from './components/Table.vue'
import SidePanel from './components/SidePanel.vue'

export default {
  name: 'App',
  components: {
    Table,
    SidePanel
  }
}
</script>