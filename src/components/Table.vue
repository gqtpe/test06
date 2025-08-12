<script setup lang="ts">

import type {Table} from "@tanstack/vue-table";

type Props = {
  table: Table<any>
}
defineProps<Props>()
</script>

<template>
  <table>
  <thead>
  <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
    <th
        v-for="header in headerGroup.headers"
        :key="header.id"
        @click="header.column.getToggleSortingHandler()?.($event)"
    >
      {{ header.column.columnDef.header }}
      <span v-if="header.column.getIsSorted()">
              {{ header.column.getIsSorted() === 'asc' ? '↑' : '↓' }}
            </span>
    </th>
  </tr>
  </thead>
  <tbody>
  <tr v-for="row in table.getRowModel().rows" :key="row.id">
    <td v-for="cell in row.getVisibleCells()" :key="cell.id">
      {{ cell.getValue() }}
    </td>
  </tr>
  </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  color: white;
  border-collapse: collapse;
}

th, td {
  border-bottom: 2px solid var(--color-gray-400);
  padding: 0.5rem;
  text-align: center;
}

th {
  cursor: pointer;
}
</style>