<script setup lang="ts">
import dayjs from "dayjs";
import {createColumnHelper,} from "@tanstack/vue-table";
import type {StockItem} from "@/api/entities.ts";
import DataPage from "@/components/DataPage.vue";
import {useStocks} from "@/features/Stocks/stocksStore.ts";

const store = useStocks();
const columnHelper = createColumnHelper<StockItem>();
const columns = [
  columnHelper.accessor((cell) => dayjs(cell.date).format('YYYY/MM/DD'), {header: "Date"}),
  columnHelper.accessor("supplier_article", {header: "Article"}),
  columnHelper.accessor("warehouse_name", {header: "Ware House"}),
  columnHelper.accessor((cell) => Number(cell.price).toFixed(2), {header: "Price"}),
];

</script>

<template>
  <DataPage :store="store" :fetchFn="store.getStocks" :columns="columns"/>
</template>
