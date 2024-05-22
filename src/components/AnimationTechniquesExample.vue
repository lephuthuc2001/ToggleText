<template>
  <section>
    <h2 class="mb-4 text-xl">Animation Techniques Example</h2>
    <div class="flex gap-4 flex-wrap">
      <div class="border border-orange-500 p-4 basis-1/4 rounded">
        <button class="btn" @click="toggleShow">Toggle</button>
        <Transition name="slide" appear>
          <p class="text-xl mt-4" v-if="show">Hello</p>
        </Transition>
      </div>
      <div class="border border-orange-500 p-4 basis-1/4 rounded">
        <button class="btn" @click="toggleGreetings">Greeting</button>
        <Transition name="slide" appear>
          <p class="text-xl mt-4" v-if="showHello">Hello</p>
          <p class="text-xl mt-4" v-else-if="showMyNameIs">My name is</p>
          <p class="text-xl mt-4" v-else-if="showLePhuThuc">Le Phu Thuc</p>
        </Transition>
      </div>
      <div class="border border-orange-500 p-4 basis-1/4 rounded">
        <button class="btn mr-4" @click="increment">Increment</button>
        <Transition name="fade" appear>
          <span class="text-xl mt-4" :key="count">{{ count }}</span>
        </Transition>
      </div>
      <div class="border border-orange-500 p-4 flex-grow rounded">
        <div class="flex gap-4 flex-wrap">
          <button class="btn" @click="removeNumber">Remove Number</button>
          <button class="btn" @click="addNumber">Add Number</button>
          <button class="btn" @click="shuffleNumbers">Shuffle Numbers</button>
          <button class="btn" @click="toggleRowAndColumn">
            Toggle Row/Column
          </button>
        </div>

        <TransitionGroup name="list" tag="ul" :class="list" class="pl-6" appear>
          <li class="text-xl" v-for="number in numbers" :key="number">
            {{ number }}
          </li>
        </TransitionGroup>
      </div>
      <div class="border border-orange-500 p-4 basis-1/4 rounded">
        <button class="btn" @click="showAnimate = !showAnimate">
          Toggle ANIMATION
        </button>

        <p
          class="text-xl mt-4"
          :class="{
            'animate-bounce': showAnimate,
          }"
        >
          PULSE
        </p>
      </div>
    </div>
    <div
      v-color-on-resize
      class="border border-black p-4 rounded resize-x overflow-hidden mt-4"
    >
      <p>Resize the Paragraph to change background color</p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, Transition } from "vue";

const show = ref(true);

const showHello = ref(true);
const showMyNameIs = ref(false);
const showLePhuThuc = ref(false);

const row = ref(true);

const showAnimate = ref(false);

const toggleGreetings = () => {
  if (showHello.value) {
    showHello.value = false;
    showMyNameIs.value = true;
  } else if (showMyNameIs.value) {
    showMyNameIs.value = false;
    showLePhuThuc.value = true;
  } else {
    showLePhuThuc.value = false;
    showHello.value = true;
  }
};

function toggleShow() {
  show.value = !show.value;
}

const count = ref(0);
const increment = () => {
  count.value++;
};

const numbers = ref(Array.from({ length: 10 }, (_, i) => i + 1));

const removeNumber = () => {
  const randomIndex = Math.floor(Math.random() * numbers.value.length);
  numbers.value.splice(randomIndex, 1);
};

const addNumber = () => {
  let newNumber;
  do {
    newNumber = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
  } while (numbers.value.includes(newNumber));

  const randomIndex = Math.floor(Math.random() * numbers.value.length);
  numbers.value.splice(randomIndex, 0, newNumber);
};

const shuffleNumbers = () => {
  for (let i = numbers.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers.value[i], numbers.value[j]] = [numbers.value[j], numbers.value[i]];
  }
};

function toggleRowAndColumn() {
  row.value = !row.value;
}

const list = computed(() => {
  return {
    flex: true,
    "flex-col": !row.value,
    "flex-row": row.value,
    "flex-wrap": true,
    "gap-4": true,
  };
});

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    entry.target.style.backgroundColor = `hsl(${entry.contentRect.width}, 80%, 80%)`;
  }
});

const vColorOnResize = {
  mounted(el) {
    resizeObserver.observe(el);
  },
  unmounted(el) {
    resizeObserver.disconnect();
  },
};
</script>

<style lang="css" scoped>
/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: transform 0.5s ease, opacity 0.5s ease-out;
}

.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease-in;
  position: absolute;
}

.slide-enter-from {
  transform: translateX(-100px);
  opacity: 0;
}

.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
