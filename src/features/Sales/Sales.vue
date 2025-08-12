<script setup lang="ts">
import {onMounted} from "vue";
import {storeToRefs} from 'pinia';
import {useSales} from "@/features/Sales/salesStore.ts";


const incomesStore = useSales();
const {sales} = storeToRefs(incomesStore);
const {getSales} = incomesStore;
onMounted(async () => {
  await getSales({
    dateFrom: '2025-08-11',
    dateTo: '2025-08-11',
    limit: 10,
    page: 1,
  });
});
</script>

<template>
  Incomes Page
  {{ JSON.stringify(sales) }}
</template>
