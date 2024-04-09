<script setup lang="ts">
import { ref } from 'vue';

defineProps({
    playerName:String,
    shipName:String
})

</script>

<template>
    <div class="container rounded border-2 border">
        <span class="p-2">{{ playerName }}</span>
        <span class="row">

        </span>
    </div>
</template>

<style scoped>
</style>