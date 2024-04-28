// Ce composant permet d'afficher simplement une liste d'erreur. Il devient visible uniquement si au moins une erreur est dans la liste.

<script setup lang="ts">

defineProps({
    title:{type:String, required:true},
    errors:{type:Array<string>, required:true}
})

</script>

<template>
    <div class="alert alert-danger" v-if="errors.length > 0">
        <h2>{{ title }}</h2>
        <ul>
            <li v-for="error of errors" >{{ error }}</li>
        </ul>
    </div>
</template>

<style>
</style>