<script setup>
import { defineProps, defineEmits } from "vue";

// Оголошення пропсів
const props = defineProps({
  text: {
    type: String,
    default: "Button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// Оголошення функції для емітування події
const emit = defineEmits(["click"]);

// Обробка кліку кнопки
const handleClick = () => {
  emit("click");
};

// Ф-ція отримання класів в залежності від пропси disabled
const getButtonClasses = () => {
  return props.disabled
    ? "bg-cyan-900 cursor-not-allowed"
    : "hover:bg-cyan-600";
};
</script>

<template>
  <button
    @click="handleClick"
    :disabled="disabled"
    :class="[
      'w-full bg-cyan-500 text-white px-4 py-2 rounded focus:outline-none shadow-lg',
      getButtonClasses(),
    ]"
  >
    {{ text }}
  </button>
</template>
