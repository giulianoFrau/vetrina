<template>
  <div
    class="home-view w-full flex flex-column gap-5 justify-content-center align-items-center mt-7 mb-5"
  >
    <img
      src="https://smart-contact-cdn.livelanding.it/images/logo-meglioQuesto-alternativo.png"
      alt="logo-mq-whistleblowing"
      width="300"
    />
    <div class="home-view__title font-bold text-center py-3">Homepage</div>

    <div class="flex gap-5">
      <div class="underline cursor-pointer" @click="authStore.logout">
        Logout
      </div>
      <div
        class="cursor-pointer underline"
        link
        @click="changePasswordDialog = true"
      >
        Modifica password
      </div>
    </div>

    <Dialog
      :showHeader="false"
      v-model:visible="changePasswordDialog"
      modal
      dismissableMask
      header="Recupero password"
      :style="{ width: '40vw' }"
      :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
    >
      <ChangePasswordForm
        @updatePassword="changePasswordDialog = false"
      ></ChangePasswordForm>
    </Dialog>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
import { useAuthStore } from "@/stores";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm.vue";
const changePasswordDialog = ref(false);
const authStore = useAuthStore();
const showLoadingDialog = inject("showLoadingDialog");

onMounted(async () => {});
</script>
