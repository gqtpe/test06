<script setup lang="ts">
import Chart from 'chart.js/auto';
import { onMounted, onBeforeUnmount, ref, useTemplateRef, watch } from "vue";
import type { Entities, IncomesItem, OrderItem, SaleItem, StockItem } from "@/api/entities.ts";

type Props = { data: Entities }
const { data } = defineProps<Props>();

const ctx = useTemplateRef<HTMLCanvasElement>('myChart');
const chartInstance = ref<Chart>();
const selectValueFromEntities = (data: Entities) => {
  if ('number' in (data[0] || {})) {
    return (data as IncomesItem[]).map(item => Number(item.quantity));
  } else if ('discount' in (data[0] || {})) {
    return (data as StockItem[]).map(item => Number(item.price));
  } else if ('oblast' in (data[0] || {})) {
    return (data as OrderItem[]).map(item => Number(item.total_price));
  } else {
    return (data as SaleItem[]).map(item => Number(item.finished_price));
  }
};


onMounted(() => {
  if (ctx.value) {
    chartInstance.value = new Chart(ctx.value, {
      type: 'line',
      data: {
        labels: data.map(item => item.date),
        datasets: [{
          label: 'value',
          data: selectValueFromEntities(data),
          borderWidth: 1
        }]
      }
    });
  }
});

watch(
    () => data,
    (newData) => {
      if (chartInstance.value) {
        chartInstance.value.data.labels = newData.map(item => item.date);
        chartInstance.value.data.datasets[0].data = selectValueFromEntities(newData);
        chartInstance.value.update();
      }
    },
    { deep: true }
);

onBeforeUnmount(() => {
  chartInstance.value?.destroy();
});
</script>

<template>
  <canvas ref="myChart"></canvas>
</template>
