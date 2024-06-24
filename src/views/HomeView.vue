<template>
  <div class="home-view w-full flex flex-col">
    <app-menu />
    <app-home />
    <app-footer />
  </div>
</template>

<script setup>
import AppMenu from "../components/AppMenu.vue";
import AppFooter from "../components/AppFooter.vue";
import AppHome from "../components/AppHome.vue";
</script>

<style lang="scss" scoped></style>
