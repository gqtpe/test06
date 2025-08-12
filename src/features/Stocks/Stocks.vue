<script setup lang="ts">
import { onMounted } from "vue";
import { useStocksStore } from "@/features/Stocks/stocksStore.ts";
import { storeToRefs } from "pinia";

const stocksStore = useStocksStore();
const { stocks } = storeToRefs(stocksStore);
const { getStocks } = stocksStore;

onMounted(async () => {
  await getStocks({
    dateFrom: "2025-08-12",
    dateTo: "2025-08-12",
    limit: 10,
    page: 1,
  });
});
</script>

<template>
  <div class="text-white">
    <h1>Stocks Page</h1>

    <table border="1" cellpadding="5" style="border-collapse: collapse; color: white;">
      <thead>
      <tr>
        <th>Дата</th>
        <th>Артикул</th>
        <th>Склад</th>
        <th>Кол-во</th>
        <th>Цена</th>
        <th>Скидка</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in stocks.data" :key="index">
        <td>{{ item.date }}</td>
        <td>{{ item.supplier_article }}</td>
        <td>{{ item.warehouse_name }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.discount }}%</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  background: #222;
}
th {
  background: #333;
}
</style>
