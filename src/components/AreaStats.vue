<template>
    <div class="typing-area__stats">
        <span class="typing-area__stats-accuracy">Точность: {{formattedTypingAccuracy}} </span>
        <span class="typing-area__stats-speed">Скорость: {{formattedPureTypingSpeed}}</span>
    </div>
</template>

<script setup>
const props = defineProps({
    formattedTypingAccuracy: {
        type: String,
    },
    formattedPureTypingSpeed: {
        type: String,
    }
})
</script>

<style>
.typing-area__stats {
    margin-left: 40px;
    color: green;
    font-size: 18px;
    font-weight: bold;
}

.typing-area__stats-speed {
    margin-left: 20px;

}
</style>