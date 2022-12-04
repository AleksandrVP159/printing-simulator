<template>
    <main class="typing-area-wrapper">
        <div class="typing-area">

            <input class="typing-area__input" type="text" disabled ref="typingInputRef" @keydown="keyMonitor">

            <h2 class="typing-area__h2" v-if="hasTypingTestStarted && !isTypingTestFinished">Начинайте печатать текст
            </h2>

            <article class="typing-area__text">
                <span class="typing-area__text-span" v-for="(letter, index) in text"
                    :class="[(hasTypingTestStarted && letter == typedText[index])? 'typing-area__text-span_correct': '', 
                    (hasTypingTestStarted && (index == typedText.length) && !isTypedTextCorrect)? 'typing-area__text-span_error': '' ]" :key="index">{{letter}}</span>
            </article>

            <AreaMenu :hasTypingTestStarted="hasTypingTestStarted" :isTypingTestFinished="isTypingTestFinished"
                @on-start="startTypingText" @on-restart="restartTypingText" />

            <AreaStats v-if="!isTypingTestFinished" :formattedTypingAccuracy="formattedTypingAccuracy"
                :formattedPureTypingSpeed="formattedPureTypingSpeed" />
        </div>
    </main>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex'

import AreaMenu from './AreaMenu.vue';
import AreaStats from './AreaStats.vue';

const store = useStore()

let typedText = ref([])
let numberOfTypos = ref(0)
let typingTimer = ref(null)
let minutesSpentTyping = ref(0)
let hasTypingTestStarted = ref(false)
let isTypingTestFinished = ref(false)

let typingInputRef = ref(null)

// lifecycle hooks
onMounted(() => {
    store.dispatch('getAllRequests')
})
onBeforeUnmount(() => {
    clearInterval(typingTimer.value)
})

// computed
const text = computed(() => store.getters.getRequests)

const textArraySplit = computed(() => text.value)

const isTypedTextCorrect = computed(() => {
    let i = typedText.value.length
    if (typedText.value[i - 1] !== textArraySplit.value[i - 1]) {
        handleTypo()
        return false
    } else {
        return true
    }
})

const noTypingDataYet = computed(() => {
    return (minutesSpentTyping.value === 0 || !(typedText.value.length > 0))
})

const typingAccuracy = computed(() => {
    if (isTypedTextCorrect.value == true && text.value.length !== 0 && typedText.value.length === text.value.length) {
        finishedTypingText()
    }
    if (noTypingDataYet.value) {
        return 100
    } else if ((typedText.value.length - numberOfTypos.value) <= 0) {
        return 0
    } else {
        return (((typedText.value.length - numberOfTypos.value + 1) / (typedText.value.length + 1)) * 100)
    }
})

const formattedTypingAccuracy = computed(() => {
    return (typingAccuracy.value % 1 === 0) ? (typingAccuracy.value + '%') : (typingAccuracy.value.toFixed(1) + '%')
})

const typingSpeed = computed(() => {
    return (typedText.value.length + numberOfTypos.value) / minutesSpentTyping.value
})

const pureTypingSpeed = computed(() => {
    if (noTypingDataYet.value) {
        return 0
    } else {
        return (typingSpeed.value - (numberOfTypos.value / minutesSpentTyping.value))
    }
})

const formattedPureTypingSpeed = computed(() => {
    return Math.round(pureTypingSpeed.value) + ' зн./мин'
})

// methods

function startTypingText() {
    typingTimer.value = setInterval(() => {
        minutesSpentTyping.value += 1 / 60
    }, 1000)
    typingInputRef.value.disabled = false
    typingInputRef.value.focus()
    hasTypingTestStarted.value = true
}

const keyMonitor = (e) => {
    if (e.key != 'Shift' && e.key != "Enter") {
        typedText.value.push(e.key)
    }
}

const handleTypo = () => {
    typedText.value.pop()
    numberOfTypos.value++
}

function restartTypingText() {
    store.dispatch('getAllRequests')
    clearInterval(typingTimer.value)
    typingInputRef.value.disabled = true
    typedText.value = []
    numberOfTypos.value = 0
    minutesSpentTyping.value = 0
    typingTimer.value = 0
    isTypingTestFinished.value = false
    startTypingText()
}

const finishedTypingText = () => {
    clearInterval(typingTimer.value)
    typingInputRef.value.readonly = true
    isTypingTestFinished.value = true
}


</script>

<style>
.typing-area-wrapper {
    display: flex;
    justify-content: space-around;
    padding: 20px;
}

.typing-area {
    min-height: 450px;
    min-width: 320px;
    display: flex;
    flex-wrap: wrap;
    background: #F3F8F1;
    background-clip: content-box;
    justify-content: center;
    align-items: center;
    border: 30px solid transparent;
    margin: 0 auto;
}

.typing-area__input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.typing-area__h2 {
    color: green;
}

.typing-area__text {
    min-width: 500px;
    width: 100%;
    height: auto;
    text-align: left;
    font-size: 24px;
    padding: 10px 20px
}

.typing-area__text-span_correct {
    color: green;
}

.typing-area__text-span_error {
    background: red;
    color: white;
}
</style>
