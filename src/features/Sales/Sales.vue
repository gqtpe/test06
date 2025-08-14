<script setup lang="ts">
import dayjs from "dayjs";
import {createColumnHelper,} from "@tanstack/vue-table";
import type {SaleItem} from "@/api/entities.ts";
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
  <DataPage :store="store" :fetchFn="store.getSales" :columns="columns"/>
</template>

