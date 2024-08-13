<script setup>
import { ref, computed, defineProps } from "vue";

// Оголошення пропсів
const props = defineProps({
  position: {
    type: String,
    default: "top", // Може бути 'top', 'bottom', 'left', 'right'
  },
  width: {
    type: String,
    default: "w-56",
  },
});

const isVisible = ref(false);

// Ф-ція показу тултіпа
const showTooltip = () => {
  isVisible.value = true;
};

// Ф-ція щоб сховати тултіп
const hideTooltip = () => {
  isVisible.value = false;
};

const tooltipClasses = computed(() => {
  switch (props.position) {
    case "bottom":
      return "top-full left-1/2 transform -translate-x-1/2 mt-2";
    case "left":
      return "right-full top-1/2 transform -translate-y-1/2 mr-2";
    case "right":
      return "left-full top-1/2 transform -translate-y-1/2 ml-2";
    default: // 'top'
      return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
  }
});
</script>

<template>
  <div class="relative" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <!-- Основний контент над яким буде з'являтися тултіп -->
    <slot name="trigger"></slot>

    <!-- Tooltip -->
    <transition name="fade">
      <div
        v-if="isVisible"
        :class="[tooltipClasses, width]"
        class="absolute z-10 p-2 text-white bg-gray-800 rounded shadow-md"
      >
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
