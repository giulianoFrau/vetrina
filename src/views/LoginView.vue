<template>
  <div id="login-view" class=" flex-col w-full h-screen bg-no-repeat bg-cover">
    <div class="py-4 sm:py-6"></div>
    <div class="logo mx-auto mb-5">
      <img
        alt="logo bd corporation"
        class="img-contain"
        width="300"
        src="@/assets/images/logo-bd.jpg"
      />
    </div>
    <div class="container">
      <div class="form-container mx-auto">
        <h2 class="text-center text-bluegray-700 pb-6">Login</h2>
        <div>
          <login-form
            class="mx-auto px-4"
            id="login-form"
            data-cy="login-form"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from "@/components/forms/LoginForm.vue";
</script>

<style lang="scss">
#login-view {
  .logo {
    width: min-content;

  }

  @include media-breakpoint-up("md") {
    .form-container {
      width: min-content;
    }
  }
}
</style>
