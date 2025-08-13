<script setup lang="ts">
import {computed, type Ref} from "vue";
import type {Filters} from "@/features/App/types.ts";

type Props = {
  total: number
  filters: Filters
}
let {total, filters} = defineProps<Props>()
const maxPage = computed(() => Math.ceil(total / filters.limit));
function prevPage() {
  if (filters.page > 1) filters.page--;
}

function nextPage() {
  if (filters.page < maxPage.value) filters.page++;
}
const displayFrom = computed(() => 1 + (filters.page - 1) * filters.limit);
const displayTo = computed(() => Math.min(filters.page * filters.limit, total));
</script>

<template>
  <div class="flex justify-between items-center px-[2rem]">
    <div>
      Display lines per page
      <input
          class="date-input text-center w-[4rem]"
          v-model="filters.limit"
          type="number"
          step="10"
          min="10"
          max="30"
      >
    </div>
    <div class="flex gap-[1rem] items-center">
      <span>{{ displayFrom }} - {{ displayTo }} of {{ total }}</span>
      <button @click="prevPage" :disabled="filters.page === 1">Prev</button>
      <button @click="nextPage" :disabled="filters.page === maxPage">Next</button>
    </div>
  </div>
</template>

<style scoped>

</style>