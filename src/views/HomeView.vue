<template>
  <div class="home-view w-full flex flex-col">
    <app-menu />
    <app-home />
    <app-footer />
  </div>
</template>

<script setup>
import AppHome from "../components/routes/AppHome.vue";
import AppFooter from "../components/layout/AppFooter.vue";
import AppMenu from "../components/layout/AppMenu.vue";
</script>

<style lang="scss" scoped></style>
