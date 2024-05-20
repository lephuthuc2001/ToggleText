import { ref, computed, onUnmounted } from "vue";

function useClock(locale = "vi-VN", formatOptions = {}) {
  const time = ref(new Date());

  const updateTime = () => {
    time.value = new Date();
  };

  const timeInterval = setInterval(updateTime, 1000);

  onUnmounted(() => {
    clearInterval(timeInterval);
  });

  return {
    time: computed(() => time.value.toLocaleString(locale, formatOptions)),
  };
}

export default useClock;
