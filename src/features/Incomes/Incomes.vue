<script setup lang="ts">
import dayjs from "dayjs";
import { createColumnHelper } from "@tanstack/vue-table";
import { useIncomes } from "@/features/Incomes/incomesStore.ts";
import type { IncomesItem } from "@/api/entities.ts";
import DataPage from "@/components/DataPage.vue";
import {onMounted} from "vue";
import {useAppStore} from "@/features/App/appStore.ts";

const store = useIncomes();
const columnHelper = createColumnHelper<IncomesItem>();
const columns = [
  columnHelper.accessor((c) => dayjs(c.date).format("YYYY/MM/DD"), { header: "Date" }),
  columnHelper.accessor((c) => dayjs(c.date_close).format("YYYY/MM/DD"), { header: "Date Close" }),
  columnHelper.accessor("supplier_article", { header: "Article" }),
  columnHelper.accessor("warehouse_name", { header: "Warehouse" }),
  columnHelper.accessor((c) => Number(c.total_price).toFixed(2), { header: "Price" }),
];
const appStore = useAppStore()
onMounted(()=>{
  appStore.setAppStatus('Try to change data period')
})
</script>

<template>
  <DataPage :store="store" :fetchFn="store.getIncomes" :columns="columns" />
</template>
