<script setup lang="ts">
    defineProps({
        message:String,
        show:Boolean
    })

</script>

<template>
    <div class="error" v-if="show == true">
        <h2>Erreur</h2>
        <p>{{ message }}</p>
    </div>
</template>
<style scoped>
.error{
    border : 3px solid red;
    background-color: rgba(255, 0, 0, 0.500);
}
</style>