<script setup lang="ts">
import {RouterView} from "vue-router";
import useAppToasts from "@/app/hooks/useAppToasts.ts";
useAppToasts();
</script>

<template>
<div class="bg-zinc-800 w-[100wh] h-[100vh]">
<RouterView></RouterView>
</div>
</template>

<style scoped>

</style>
