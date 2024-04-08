<script setup lang="ts">
import { ref } from 'vue';

defineProps({
    name:String,
    shipName:String
})

</script>

<template>
    <div class="container">
        <span class="p-2">{{ name }}</span>
        <span class="row">

        </span>
    </div>
</template>

<style scoped>
</style>