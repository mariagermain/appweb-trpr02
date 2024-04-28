<script setup lang="ts">
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
    <div class="background" v-if="visible">
        <div  class="window">
            <h2 class="text-center">{{ title }}</h2>
            <p class="text-center">{{ message }}</p>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary center" @click="emitOk()">Oui</button>
                <button class="btn btn-primary center" @click="emitCancel()">Non</button>
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
    }

    button{
        margin:10px;
    }
</style>