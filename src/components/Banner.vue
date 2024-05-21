<template>
  <div
    class="banner flex-grow gap-2 p-4 flex flex-col content-start max-w-96 border rounded border-orange-500 border-solid"
  >
    <section>
      <slot name="header"> Header </slot>
    </section>
    <hr />
    <section>
      <slot name="content" :discount="50"> Content </slot>
    </section>
    <hr />

    <section v-if="$slots.footer">
      <slot name="footer"> Footer </slot>
    </section>
  </div>
</template>

<script setup></script>

<style scoped></style>
