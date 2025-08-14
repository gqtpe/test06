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
        <v-icon v-if="header.column.getIsSorted()"
                :name="header.column.getIsSorted() === 'asc' ? 'pr-sort-amount-up' : 'pr-sort-amount-down-alt'"/>
        <v-icon v-else name="pr-sort-alt"/>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="table.getRowModel().rows.length" v-for="row in table.getRowModel().rows" :key="row.id">
      <td v-for="cell in row.getVisibleCells()" :key="cell.id">
        {{ cell.getValue() }}
      </td>
    </tr>
    <tr v-else class="w-full text-center">
      (nothing found)
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  color: var(--color-gray-300);
  width: 100%;
  border-collapse: collapse;
}

thead, tbody {
  display: table-header-group;
}

th, td {
  padding: 0.5rem;
  text-align: center;
}

tr, th {
  border-bottom: 1px solid var(--color-gray-500);
}

th {
  border-bottom-width: 3px;
}

tr:last-child {
  border-bottom: 0 solid transparent;
}

th {
  cursor: pointer;
}
</style>