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
    <div class="background" v-if="visible">
        <div class="window">
            <h2 class="text-center">{{ title }}</h2>
            <p class="text-center">{{ text }}</p>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary center" @click="onClickBtnClose() ">{{ buttonText }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .background{
        position: absolute;
        top:0%;
        left:0%;
        background-color: rgba(0, 0, 0, 0.75);
        height: 100%;
    }
    .window{
        position: absolute;
        top: 30%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);

        border:2px solid black;
        border-radius:10px;
        background-color: white;
        padding:10px;
        min-width: 50%;
    }

    button{
        margin:10px;
    }
</style>