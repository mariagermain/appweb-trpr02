<script setup lang="ts">
import { ref } from 'vue';

defineProps({
    playerName:String,
    shipName:String
})

</script>

<template>
    <div class="container bg-dark rounded border-2 border">
        <div class="p-2 bg-primary">{{ playerName }}</div>
        <div class="row">

        </div>
    </div>
</template>

<style scoped>
</style>