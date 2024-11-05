<template>
  <footer class="bg-primary text-white py-5">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <div class="flex-shrink-0">
        <img
          alt="logo footer"
          src="@/assets/images/logo-bd-black.png"
          :class="{ 'w-32': isMobile, 'w-48': !isMobile }"
        />
      </div>
      <nav class="ml-10 flex gap-x-4 flex-wrap">
        <router-link to="/" class="text-white hover:text-gray-300"
          >Privacy Policy</router-link
        >
        <router-link to="/servizi" class="text-white hover:text-gray-300"
          >Servizi</router-link
        >
      </nav>
    </div>
    <div class="mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p class="text-sm">Indirizzo: Via Example, 123 - Città, CAP</p>
      <p class="text-sm">Email: info@example.com</p>
      <p class="text-sm">Telefono: 0123456789</p>
    </div>
  </footer>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isMobile = inject("isMobile");
</script>
