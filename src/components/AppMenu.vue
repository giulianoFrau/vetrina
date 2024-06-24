<template>
  <div class="menu-container">
    <Menubar :model="items">
      <template #start>
        <img alt="logo bd" src="@/assets/images/logo-bd.png" v-if="!isMobile" />
        <img
          alt="logo bd"
          src="@/assets/images/logo-bd.png"
          width="200"
          v-else
        />
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center px-5" v-bind="props.action">
          <span :class="item.icon" />
          <span class="menu-container__label ml-2">{{ item.label }}</span>
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
  {
    label: "Contattaci",
    icon: "pi pi-envelope",
    command: () => {
      router.push("/contatti");
    },
  },
]);
</script>

<style lang="scss">
.menu-container {
  .p-menubar {
    background-color: #f7f7f7;
    border-radius: 0;
    justify-content: space-around;
  }

  &__label {
    font-size: 1.2rem;
  }

  @include media-breakpoint-down("lg") {
    .p-menubar .p-menubar-root-list {
      border-color: #35dee5 transparent transparent transparent;
      border-style: solid solid solid solid;
      border-width: 2px 0px 0px 0px;
    }
  }
}
</style>
