<script setup>
import { ref, onMounted } from "vue";
import Input from "./components/Input.vue";
import Button from "./components/Button.vue";
import Card from "./components/Card.vue";
import Tooltip from "./components/Tooltip.vue";

import { getRandomNumber } from "./utils/randomNumber";
import { getCurrentDateTime } from "./utils/currentDateTime";
import { formatPrice } from "./utils/formatPrice";
import texts from "./utils/texts.json";

const inputValue = ref("");
const dataOfPrices = ref([]);
const randomNumber = ref(0);
const inputHasError = ref(false);

// Констата
const STABLE_PRICE = 50000;

const handleAdd = () => {
  if (inputValue.value) {
    dataOfPrices.value.push({
      price: inputValue.value.replace(/ /g, ""),
      formattedPrice: formatPrice(inputValue.value.replace(/ /g, ""), 18),
      date: getCurrentDateTime(),
    });
    inputValue.value = "";
  }
};

// Ф-ція відсклідковування помилки у інпута та блокування або ні кнопки Add price
const handleOccuredError = (value) => {
  inputHasError.value = value;
};

// Ф-ція отримання класів в залежності від парметра ціни
const getPriceClasses = (price) => {
  return +price > STABLE_PRICE ? "text-green-600" : "text-red-600";
};

// Ф-ція отримання класів в залежності від пропси disabled
const getIconClasses = () => {
  return inputValue.value
    ? "text-cyan-500 cursor-copy"
    : "cursor-not-allowed text-cyan-900";
};

// Кожен раз коли монтується компонент(перезавантужається сторінка) - генеруємо рандомне число в вказаному ренджі
onMounted(() => {
  randomNumber.value = getRandomNumber(45000, 70000);
});
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="text-2xl font-bold mb-4 text-center text-slate-800">
      {{ texts.mainTitle }}
      <div
        class="cursor-default transition duration-0 hover:duration-150 transition ease-in-out delay-150 hover:scale-105"
      >
        <span class="text-sm">{{ texts.mainSubTitle }}</span>
        <span :class="getPriceClasses(+randomNumber)" class="text-sm">{{
          formatPrice(+randomNumber)
        }}</span>
      </div>
    </div>
    <div
      class="flex flex-col md:flex-row md:flex-row gap-2 justify-between items-center w-2/3 mx-auto"
    >
      <Input
        v-model="inputValue"
        @handleEnter="handleAdd"
        @errorOccurred="handleOccuredError"
        :errorText="texts.inputErrorText"
      >
        <div class="absolute right-2 top-2">
          <Tooltip width="w-56">
            <template #trigger>
              <svg
                :class="['h-6 w-8', getIconClasses()]"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                @click="handleCopyIconClick"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <rect x="8" y="8" width="12" height="12" rx="2" />
                <path
                  d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
                />
              </svg>
            </template>
            <template #content>
              <strong>{{ texts.tooltipContent }}</strong>
            </template>
          </Tooltip>
        </div>
      </Input>

      <div class="w-full md:w-56">
        <Button
          :text="texts.buttonTitle"
          :disabled="!inputValue || inputHasError"
          @click="handleAdd"
        />
      </div>
    </div>

    <Card v-if="dataOfPrices.length" class="w-2/3 flex flex-row mx-auto mt-10">
      <transition-group
        name="list"
        tag="ul"
        class="divide-y divide-gray-300 w-full"
      >
        <li
          class="flex flex-col md:flex-row justify-between items-center py-1"
          v-for="item in dataOfPrices"
          :key="item.date"
        >
          <div
            class="font-semibold text-sm text-slate-900 dark:text-slate-200 basis-1/2 cursor-default transition duration-0 hover:duration-150 transition ease-in-out delay-150 hover:scale-105"
          >
            {{ texts.price }}:
            <span class="font-bold" :class="getPriceClasses(+item.price)">{{
              item.formattedPrice
            }}</span>
          </div>
          <time
            class="text-xs font-light leading-6 text-slate-500 dark:text-slate-40"
          >
            {{ item.date }}
          </time>
        </li>
      </transition-group>
    </Card>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.list-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
