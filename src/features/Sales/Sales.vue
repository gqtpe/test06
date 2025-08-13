<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useOrders} from "@/features/Orders/ordersStore.ts";
import dayjs from "dayjs";
import {createColumnHelper, getCoreRowModel, getSortedRowModel, type Table, useVueTable,} from "@tanstack/vue-table";
import TableC from "@/components/Table.vue"
import type {OrderItem, SaleItem} from "@/api/entities.ts";
import useFetchData from "@/features/App/hooks/useFetchData.ts";
import Pagination from "@/components/Pagination.vue";
import {useSales} from "@/features/Sales/salesStore.ts";
import DataPage from "@/components/DataPage.vue";

const store = useSales()
const columnHelper = createColumnHelper<SaleItem>();
const columns = [
  columnHelper.accessor((cell) => dayjs(cell.date).format('YYYY/MM/DD'), {header: "Date"}),
  columnHelper.accessor("supplier_article", {header: "Article"}),

  columnHelper.accessor("oblast_okrug_name", {header: "Oblast"}),
  columnHelper.accessor("region_name", {header: "Region"}),
  columnHelper.accessor((cell) => Number(cell.finished_price).toFixed(2), {header: "Price"}),
];
</script>


<template>
  <DataPage :store="store" :fetchFn="store.getSales" :columns="columns" />
</template>

