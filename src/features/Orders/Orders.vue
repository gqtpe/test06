<script setup lang="ts">
import {onBeforeMount, onMounted, ref, watch} from "vue";
import {storeToRefs} from 'pinia';
import {useOrders} from "@/features/Orders/ordersStore.ts";
import dayjs from "dayjs";

type Filters = {
  dateFrom: string
  dateTo: string
  page: number
  limit: number
}

const incomesStore = useOrders();
const {orders} = storeToRefs(incomesStore);
const {getOrders} = incomesStore;
const filters = ref<Filters>({
  dateFrom: '',
  dateTo: '',
  limit: 10,
  page: 1,
})

onBeforeMount(() => {
  const today = dayjs();
  filters.value.dateFrom = today.clone().subtract(1, "day").format("YYYY-MM-DD");
  filters.value.dateTo = today.format("YYYY-MM-DD");
})

onMounted(() => {
  watch(filters, (newValue) => {
    getOrders(newValue)
  },{deep:true, immediate:true})
})
</script>

<template>
  <div class="orders-page">
    <div class="filters">
      <input class="date-input" type="date" v-model="filters.dateFrom">
      <input class="date-input" type="date" v-model="filters.dateTo">
    </div>
    <div class="orders">
      {{JSON.stringify(orders)}}
    </div>
  </div>
</template>
<style>
.orders-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.orders{
  color: white;
}
.filters {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  padding: 0.5rem;
}

.date-input {
  color: white;
  color-scheme: dark;
  padding: 0.5rem;
  border-radius: 0.25rem;
  display: inline-block;
  border: 1px solid white;
}
</style>
