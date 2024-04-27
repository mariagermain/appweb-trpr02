<script setup lang="ts">
import type { GameMsgParam } from '@/scripts/Types';
import type { EnumMember, EnumType } from 'typescript';
import { ref, type Ref } from 'vue';



const emit = defineEmits(['ok', 'cancel']);
defineExpose({
    showMessage
})

let visible:Ref<boolean> = ref(false);
let title:Ref<string> = ref("");
let message:Ref<string> = ref("");

function showMessage(newTitle:string, newMessage:string){
    title.value = newTitle;
    message.value = newMessage;
    visible.value = true;
}

function emitCancel(){
    visible.value = false;
    emit('cancel')
}

function emitOk(){
    visible.value = false;
    emit('ok')
}
</script>

<template>
    <div v-if="visible" class="center">
        <h2 class="text-center">{{ title }}</h2>
        <p class="text-center">{{ message }}</p>
        <div>
            <button class="btn btn-primary center" @click="emitOk()">Oui</button>
            <button class="btn btn-primary center" @click="emitCancel()">Non</button>
        </div>
    </div>
</template>

<style></style>