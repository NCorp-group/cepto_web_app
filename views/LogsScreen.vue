<template>
    <SidePanel/>
    <LogTable/>
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

</style>