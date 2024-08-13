<script setup>
import { ref, defineProps, watch } from "vue";
import texts from "../utils/texts.json";

// Оголошення пропсів
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  errorText: {
    type: String,
    default: "Error",
  },
});

// Оголошення подій
const emit = defineEmits(["update:modelValue", "handleEnter", "errorOccurred"]);

const hasError = ref(false);

// Локальна ф-ція форматування
const formatNumber = (value) => {
  const parts = value.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

// Валідація введених данних
const validateInput = (event) => {
  const regex = /^\d*(\.\d{0,18})?$/;
  const rawValue = event.target.value.replace(/[' ',$]/g, ""); // Видаляємо пробіли для перевірки
  const isValid = regex.test(rawValue);

  hasError.value = !isValid;

  if (isValid) {
    const formattedValue = formatNumber(rawValue); // Форматуємо значення
    emit("update:modelValue", formattedValue); // Оновлюємо modelValue
    event.target.value = formattedValue; // Відображаємо відформатоване значення в полі вводу
  } else {
    // Якщо значення некоректне, відновлюємо попереднє значення
    event.target.value = props.modelValue;
  }
};

// Ф-ція вставки
const handlePaste = (event) => {
  const pasteData = `${event.clipboardData.getData("text")}`.replace(
    /[' ',$]/g,
    ""
  );
  if (!/^\d*(\.\d{0,18})?$/.test(pasteData)) {
    event.preventDefault();
    hasError.value = true;
  }
};

// Ф-ція копіювання
const handleCopy = (event) => {
  event.clipboardData.setData("text/plain", props.modelValue);
  event.preventDefault();
};

// Ф-ція вводу данних через ентер
const handleEnter = () => {
  !hasError.value && emit("handleEnter", props.modelValue);
};

// Слідкуємо за тим чи є помилка
watch(hasError, (newVal) => {
  if (newVal) {
    emit("errorOccurred", true); // Емітим на верх івент щоб заблокувати кнопку
  } else {
    emit("errorOccurred", false);
  }
});
</script>

<template>
  <div class="w-full relative">
    <input
      :value="modelValue"
      @input="validateInput"
      @paste="handlePaste"
      @copy="handleCopy"
      @keydown.enter="handleEnter"
      :class="{ 'border-red-500': hasError }"
      class="w-full p-2 border rounded focus:outline-none shadow-md focus:border-cyan-500"
      :placeholder="texts.inputPlaceholder"
    />
    <p v-if="hasError" class="text-red-500 text-sm mt-2 absolute">
      {{ errorText }}
    </p>
    <slot></slot>
  </div>
</template>
