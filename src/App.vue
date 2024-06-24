<template>
  <div class="app md:flex">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Toast position="top-center" />
    <Dialog
      :showHeader="false"
      v-model:visible="showLoadingDialog"
      modal
      :closable="false"
      v-if="showLoadingDialog"
    >
      <div class="flex justify-content-center">
        <ProgressSpinner
          fill="var(--surface-ground)"
          style="width: 50px; height: 50px"
          strokeWidth="6"
          animationDuration=".5s"
        ></ProgressSpinner>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { provide, ref } from "vue";

// import { useAuthStore } from "./stores";
import { breakpointsBootstrapV5, useBreakpoints } from "@vueuse/core";

import ProgressSpinner from "primevue/progressspinner";

// const authStore = useAuthStore();
const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const showLoadingDialog = ref(false);

provide("isMobile", breakpoints.smaller("md"));
provide("isTablet", breakpoints.greater("sm"));
provide("isDesk", breakpoints.greater("md"));
provide("isLittleDesk", breakpoints.smaller("lg"));
provide("isBigDesk", breakpoints.greater("lg"));
provide("showLoadingDialog", showLoadingDialog);
</script>

<style lang="scss">
@import "primeflex/primeflex.css";
@import "primevue/resources/primevue.min.css";
body {
  background-color: #f5f5f5;
}
.cut-text {
  word-break: break-word;
}

.p-toast {
  max-width: 90%;
}
.p-progress-spinner {
  width: 10rem;
  height: 10rem;
  max-width: 10rem;
  max-height: 10rem;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px var(--gray-500);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--gray-500);
  border-radius: 10px;
}
.app {
}

.p-confirm-popup {
  &-footer {
    display: flex;
    justify-content: center;
    gap: 1rem;

    .p-button-icon-left {
      display: none;
    }

    button {
      text-align: center;

      &.p-confirm-popup-reject {
        background-color: var(--gray-300);
        color: var(--primary-500);

        &:hover {
          background-color: var(--gray-600);
        }
      }
    }
  }
}

.p-dialog:has(.p-progress-spinner),
.p-dialog:has(.p-progress-spinner) .p-dialog-content {
  background: unset !important;
  border: unset !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
