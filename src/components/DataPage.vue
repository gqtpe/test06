<script setup lang="ts" generic="T">
import {type StoreGeneric, storeToRefs} from "pinia";
import {type ColumnDef, getCoreRowModel, getSortedRowModel, type Table, useVueTable} from "@tanstack/vue-table";
import TableC from "@/components/Table.vue";
import Pagination from "@/components/Pagination.vue";
import useFetchData from "@/features/App/hooks/useFetchData.ts";
import {ref} from "vue";
import Chart from "@/components/Chart.vue";

type Props<T> = {
  store: StoreGeneric;
  fetchFn: (payload: any) => void;
  columns: ColumnDef<T, any>[];
};
const {store, fetchFn, columns} = defineProps<Props<T>>();

const {total, data} = storeToRefs(store);
const {filters, changeLimit} = useFetchData(fetchFn, data.value.length || 0);
const switchToCharts = ref<boolean>(false)
const toggleValue = () => {
  if (!switchToCharts.value) {
    changeLimit(100)
  } else {
    changeLimit(10)
  }

  switchToCharts.value = !switchToCharts.value;
}
const table: Table<T> = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});

</script>

<template>
  <div class="data-page">
    <div class="filters">
      <button @click="toggleValue" class="bg-gray-800 transition-colors self-start hover:bg-gray-600">
        {{ switchToCharts ? 'Back' : 'Watch Charts' }}
      </button>
      <div class="flex gap-4">
        <input class="date-input" type="date" v-model="filters.dateFrom"/>
        <input class="date-input" type="date" v-model="filters.dateTo"/>
      </div>
    </div>
    <div v-if="!switchToCharts" class="orders flex justify-center items-center">
      <TableC :table="table"/>
    </div>
    <div v-else>
      <Chart :data="data"/>
    </div>
    <Pagination :total="total" :filters="filters"/>
  </div>
</template>

<style scoped>
.data-page {
  width: 100%;
  color: var(--color-gray-200);
  overflow: hidden;
}

.filters {
  display: flex;
  justify-content: space-between;

  padding: 0.5rem;
}

.orders {
  width: 100%;
  padding: 0.5rem;
  overflow-y: auto;
}
</style>
