<script setup lang="ts">
import useAppToasts from "@/features/App/hooks/useAppToasts.ts";
import links from "@/features/App/navLInks.ts";
import {useIsMobile} from "@/features/App/hooks/useIsMobile.ts";

useAppToasts();
const isMobile = useIsMobile()
</script>

<template>
  <header></header>
  <aside class="col-span-3 paper">
    <div class="nav-head"></div>
    <Teleport to="header" :disabled="!isMobile">
      <nav class="text-gray-500 flex flex-col gap-2 max-sm:flex-row">
        <RouterLink active-class="active" class="nav-link" v-for="link in links" :key="link.path" :to="link.path">
          <v-icon :name="link.icon"/>
          <span>{{ link.title }}</span>
        </RouterLink>
      </nav>
    </Teleport>
  </aside>
  <main class="paper col-span-9">
    <RouterView></RouterView>
  </main>
</template>

<style>
.paper {
  margin: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--color-paper);
}

#app {
  min-height: 100dvh;
  background: var(--app-bg);
  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(12, 1fr);

  header {
    display: none;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    grid-template-columns: repeat(3, 1fr);
    aside {
      display: none;
    }

    header {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }

  }
}

.nav-link {
  display: flex;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background: transparent;
  transition: background-color, 0.2s ease-in-out color, 0.2s ease-in-out;

  &:hover {
    background: var(--color-gray-800);
    color: white;
  }
}

.active {
  background: var(--color-gray-900);
  color: white;
}

.nav-head {
  background-color: #f1ff99;
  background-image: var(--mesh-bg);
  height: 3rem;
  border-radius: 0.5rem;
}

aside {
  display: flex;
  flex-direction: column;
  gap: 2rem;

}

.content {

}
</style>
