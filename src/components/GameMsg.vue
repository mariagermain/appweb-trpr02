<script setup lang="ts">
import { ref, type Ref } from 'vue';


    const emit = defineEmits(['close']);

    let title:Ref<String> = ref("");
    let text:Ref<String> = ref("");
    let visible:Ref<boolean> = ref(false);

    function showMessage(newTitle:string, newText:string){
        title.value = newTitle;
        text.value = newText;
        visible.value = true;

    }

    defineExpose({
        showMessage
    })

    function onClickBtnClose(){
        visible.value = false;
        emit("close");
    }
</script>

<template>
    <div v-if="visible" class="center">
        <h2 class="text-center">{{ title }}</h2>
        <p class="text-center">{{ text }}</p>
        <button class="button btn-primary" @click="onClickBtnClose">OK !</button>
    </div>
</template>

<style></style>