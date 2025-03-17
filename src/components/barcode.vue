<template>
  <svg ref="barcodeRef"></svg>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import JsBarcode from 'jsbarcode';

const props = defineProps<{
  value: string;
}>();

const barcodeRef = ref<SVGElement | null>(null);

onMounted(() => {
  if (props.value) {
    generateBarcode();
  }
});

watch(() => props.value, () => {
  generateBarcode();
});

const generateBarcode = () => {
  if (barcodeRef.value && props.value) {
    JsBarcode(barcodeRef.value, props.value, {
      format: 'CODE128',
      displayValue: false,
      lineColor: "#000",
      width: 2,
      height: 40,
    });
  }
};
</script>
