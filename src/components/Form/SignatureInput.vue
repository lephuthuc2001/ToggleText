<template>
  <div class="flex flex-col gap-4">
    <canvas v-signature="updateSignature"></canvas>
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
// Imports
import { useField } from "vee-validate";
import SignaturePad from "signature_pad";
import { ref, watch } from "vue";
import i18next from "i18next";

// Directive Definition
const signaturePad = ref(null);

const vSignature = {
  mounted(el, binding) {
    signaturePad.value = new SignaturePad(el, {
      backgroundColor: "rgb(255, 255, 255)",
    });

    signaturePad.value.addEventListener("endStroke", () => {
      binding.value(signaturePad.value.toDataURL("image/jpeg"));
    });
  },
  unmounted() {
    signaturePad.value.clear();
    signaturePad.value.off();
  },
};

// Setup Logic
const props = defineProps({
  formPath: {
    type: String,
    required: true,
    default: "signature",
  },
});

const { value, errorMessage } = useField(() => props.formPath);

function clearCanvas() {
  if (signaturePad.value) {
    signaturePad.value.clear();
  }
  value.value = "";
}

function updateSignature(dataUrl) {
  value.value = dataUrl;
}

i18next.on("languageChanged", clearCanvas);
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
