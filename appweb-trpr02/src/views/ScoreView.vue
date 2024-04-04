<script setup lang="ts">
import type { AxiosResponse } from 'axios';
import ScoreTable from './../components/ScoreTable.vue'


</script>

<template>
    <h1>Score</h1>
    <suspense>
        <ScoreTable></ScoreTable> 
    </suspense>
</template>

<style scoped>
</style>