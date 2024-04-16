<script setup lang="ts">
import { ref } from 'vue';

defineProps({
    playerName: String,
    shipName: String
})

</script>

<template>
    <div class="container bg-dark rounded border-2 border">
        <div class="p-2 bg-primary">{{ playerName }}</div>
        <div class="row">

        </div>
        <div>
            {{ shipName }}
        </div>
        <div class="w-100 border border-1 border-light mt-1 mb-1">
            <div class="p-1">
                    
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>