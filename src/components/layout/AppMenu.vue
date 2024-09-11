<template>
  <div class="menu-container">
    <Menubar :model="items">
      <template #start>
        <img
          alt="logo bd"
          src="@/assets/images/logo-bd-black.png"
          :width="isMobile ? '200' : '400'"
        />
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex justify-center px-5" v-bind="props.action">
          <span :class="item.icon" class="text-title" />
          <span class="menu-container__label ml-2 text-xl text-title">{{
            item.label
          }}</span>
        </a>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";

const router = useRouter();
const isMobile = inject("isMobile");

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    command: () => {
      router.push("/");
    },
  },
  {
    label: "Servizi",
    icon: "pi pi-list",
    command: () => {
      router.push("/servizi");
    },
  },
]);
</script>

<style lang="scss">
.menu-container {
  .p-menubar {
    background-color: transparent;
    border-radius: 0;
    justify-content: space-around;
  }

  @include media-breakpoint-down("lg") {
    .p-menubar .p-menubar-root-list {
      border-color: #873021 transparent transparent transparent;
      border-style: solid solid solid solid;
      border-width: 2px 0px 0px 0px;
    }
  }
}
</style>
