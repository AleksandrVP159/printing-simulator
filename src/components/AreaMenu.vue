<template>
    <menu class="typing-area__menu">
        <button v-if="!hasTypingTestStarted && !isTypingTestFinished" class="typing-area__menu-button" type="button"
            name="start" @click="onStart">Начать</button>

        <button v-if="hasTypingTestStarted || isTypingTestFinished" class="typing-area__menu-button" type="button"
            name="restart" @click="onRestart">Заново</button>
    </menu>
</template>

<script setup>
const props = defineProps({
    isTypingTestFinished: {
        type: Boolean,
    },
    hasTypingTestStarted: {
        type: Boolean,
    }
})

const emit = defineEmits(['onStart', 'onRestart'])

// methods

const onStart = () => {
    emit('onStart')
}
const onRestart = () => {
    emit('onRestart')
}
</script>

<style>
.typing-area__menu-button {
    margin-left: 20px;
    background: green;
    color: white;
    border-radius: 20px;
}

.typing-area__menu-button:hover {
    background: darkgreen;
}
</style>