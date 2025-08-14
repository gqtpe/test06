<script setup lang="ts">
import Chart from 'chart.js/auto';
import {onMounted, onBeforeUnmount, useTemplateRef, watch, ref} from "vue";
import type {Entities, IncomesItem, OrderItem, SaleItem, StockItem} from "@/api/entities.ts";

type Props = { data: Entities }
const {data} = defineProps<Props>();

const ctx = useTemplateRef<HTMLCanvasElement>('myChart');
const chartInstance = ref<Chart>();

const selectValueFromEntities = (data: Entities) => {
  if (data[0]?.hasOwnProperty('number')) {
    return (data as IncomesItem[]).map(item => item.quantity);
  } else if (data[0]?.hasOwnProperty('discount')) {
    return (data as StockItem[]).map(item => item.price);
  } else if (data[0]?.hasOwnProperty('oblast')) {
    return (data as OrderItem[]).map(item => item.total_price);
  } else {
    return (data as SaleItem[]).map(item => item.finished_price);
  }
};

watch(
    () => data,
    (newData) => {
      chartInstance.value?.destroy();
      if (ctx.value) {
        chartInstance.value = new Chart(ctx.value, {
          type: 'line',
          data: {
            labels: newData.map(item => item.date),
            datasets: [{
              label: 'value',
              data: selectValueFromEntities(newData),
              borderWidth: 1
            }]
          }
        });
      }
    },
    {deep: true}
);
onBeforeUnmount(() => {
  chartInstance.value?.destroy();
});
</script>

<template>
  <canvas ref="myChart"></canvas>
</template>
