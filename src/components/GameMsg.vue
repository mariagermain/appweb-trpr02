<script setup lang="ts">
import type { GameMsgParam } from '@/scripts/Types';
import type { EnumMember, EnumType } from 'typescript';
import { ref, type Ref } from 'vue';



    const emit = defineEmits(['close']);

    let title:Ref<string> = ref("");
    let text:Ref<string> = ref("");
    let buttonText:Ref<string> = ref("");
    let visible:Ref<boolean> = ref(false);

    function showMessage(params:GameMsgParam){
        title.value = params.title;
        text.value = params.text;
        buttonText.value = params.buttonText;
        visible.value = true;
    }

    defineExpose({
        showMessage
    })

    function onClickBtnClose(){
        visible.value = false;
        emit('close');
    }
</script>

<template>
    <div v-if="visible" class="center">
        <h2 class="text-center">{{ title }}</h2>
        <p class="text-center">{{ text }}</p>
        <button class="btn btn-primary center" @click="onClickBtnClose() ">{{ buttonText }}</button>
    </div>
</template>

<style></style>