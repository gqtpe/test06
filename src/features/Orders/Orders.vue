<script setup lang="ts">
import {useOrders} from "@/features/Orders/ordersStore.ts";
import dayjs from "dayjs";
import {createColumnHelper,} from "@tanstack/vue-table";
import type {OrderItem} from "@/api/entities.ts";
import DataPage from "@/components/DataPage.vue";

const store = useOrders()

const columnHelper = createColumnHelper<OrderItem>();
const columns = [
  columnHelper.accessor((cell) => dayjs(cell.date).format('YYYY/MM/DD'), {header: "Date"}),
  columnHelper.accessor("supplier_article", {header: "Article"}),
  columnHelper.accessor("oblast", {header: "Region"}),
  columnHelper.accessor((cell) => Number(cell.total_price).toFixed(2), {header: "Price"}),
];


</script>
<template>
  <DataPage :store="store" :fetchFn="store.getOrders" :columns="columns"/>
</template>