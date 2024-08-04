<template>
  <div class="flex flex-col gap-4">
    <canvas v-signature></canvas>
    <div class="error-message">
      {{ errorMessage }}
    </div>
    <v-row>
      <v-col>
        <v-btn size="small" @click="clearCanvas">
          <v-icon icon="fa-solid fa-refresh" />
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import SignaturePad from "signature_pad";
import { ref, watch } from "vue";
import i18next from "i18next";

const signaturePad = ref(null);

const model = defineModel({
  required: true,
});

const props = defineProps({
  errorMessage: {
    type: String,
  },
});

function clearCanvas() {
  signaturePad.value.clear();
  model.value = "";
}

i18next.on("languageChanged", clearCanvas);

const vSignature = {
  mounted(el) {
    signaturePad.value = new SignaturePad(el, {
      backgroundColor: "rgb(255, 255, 255)",
    });

    signaturePad.value.addEventListener("endStroke", () => {
      model.value = signaturePad.value.toDataURL("image/jpeg");
    });
  },
  unmounted() {
    signaturePad.value.clear();
    signaturePad.value.off();
  },
};
</script>

<style scoped>
.error-message {
  color: #b00020;
  line-height: 12px;
  word-break: break-word;
  overflow-wrap: break-word;
  word-wrap: break-word;
  -webkit-hyphens: auto;
  hyphens: auto;
  transition-duration: 150ms;
  font-size: 12px;
}
</style>
