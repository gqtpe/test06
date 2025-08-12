<script setup lang="ts">
import {onBeforeMount, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {useOrders} from "@/features/Orders/ordersStore.ts";
import dayjs from "dayjs";
import {createColumnHelper, getCoreRowModel, getSortedRowModel, type Table, useVueTable,} from "@tanstack/vue-table";
import TableC from "@/components/Table.vue"
import type {Order, OrdersPageFilters} from "@/features/Orders/types/types.ts"
import {useRoute, useRouter} from "vue-router";

const ordersStore = useOrders()
const {orders} = storeToRefs(ordersStore)
const {getOrders} = ordersStore
const router = useRouter()
const route = useRoute()
const filters = ref<OrdersPageFilters>({
  dateFrom: "",
  dateTo: "",
  limit: 10,
  page: 1,
});


onBeforeMount(() => {

  if (!filters.value.dateFrom || !filters.value.dateTo) {
    const today = dayjs();
    filters.value.dateFrom = filters.value.dateFrom || today.clone().subtract(1, "day").format("YYYY-MM-DD");
    filters.value.dateTo = filters.value.dateTo || today.format("YYYY-MM-DD");
  }


  //getting filters from query params if it exists
  for (const key of Object.keys(route.query)) {
    if (key in filters.value) {
      const typedKey = key as keyof OrdersPageFilters;
      const value = route.query[typedKey];
      if (typedKey === "page" || typedKey === "limit") {
        filters.value[typedKey] = Number(value) as OrdersPageFilters[typeof typedKey];
      } else {
        if(dayjs(String(value), 'YYYY-MM-DD', true).isValid()){
          filters.value[typedKey] = String(value) as OrdersPageFilters[typeof typedKey];
        }

      }
    }
  }


});
watch(filters, (newValue) => {
  router.push({
    query: {
      ...newValue
    }
  })
  getOrders(newValue);
}, {deep: true});

//table
const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor("g_number", {header: "G Number"}),
  columnHelper.accessor((cell)=>dayjs(cell.date).format('YYYY/MM/DD'), {header: "Date"}),
  columnHelper.accessor("supplier_article", {header: "Article"}),
  columnHelper.accessor("oblast", {header: "Region"}),
  columnHelper.accessor("brand", {header: "Brand"}),
  columnHelper.accessor("warehouse_name", {header: "Warehouse"}),
  columnHelper.accessor("total_price", {header: "Price"}),
];

// Табличный инстанс
const table: Table<Order> = useVueTable({
  data: orders,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});
</script>

<template>
  <div class="orders-page">
    <!-- Фильтры -->
    <div class="filters">
      <input class="date-input" type="date" v-model="filters.dateFrom"/>
      <input class="date-input" type="date" v-model="filters.dateTo"/>
    </div>

    <!-- Таблица -->
    <div class="orders">
      <TableC :table="table"/>
    </div>
    <div>
      pagination
      <button @click="filters.page!==0 && filters.page--"><-</button>
      <button @click="filters.page++">-></button>
    </div>
  </div>

</template>

<style scoped>
.orders-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0.5rem;
}

.date-input {
  color: white;
  color-scheme: dark;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid white;
}

.orders {
  padding: 0.5rem;
  overflow-y: auto;
}


</style>
