<script setup lang="ts">
import { onMounted } from "vue";
import { useStocksStore } from "@/features/Stocks/stocksStore.ts";
import { storeToRefs } from 'pinia';
import {useIncomes} from "@/features/Incomes/incomesStore.ts";


const incomesStore = useIncomes();
const { incomes } = storeToRefs(incomesStore);
const { getIncomes } = incomesStore;
onMounted(async () => {
  await getIncomes({
    dateFrom: '2025-08-11',
    dateTo: '2025-08-11',
    limit: 10,
    page: 1,
  });
});
</script>

<template>
  Incomes Page
  {{ JSON.stringify(incomes) }}
</template>
