<template>
  <div id="login-view" class="center flex-column w-full">
    <div class="py-4 sm:py-6"></div>
    <div class="logo mx-auto mb-5">
      <img
        alt="logo MeglioQuesto"
        class="img-contain"
        width="300"
        src="https://smart-contact-cdn.livelanding.it/images/logo-meglioQuesto-alternativo.png"
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
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #f5f9ff;
  .logo {
    width: min-content;
    // position: absolute;
    //top: 20vw;
  }

  @include media-breakpoint-up("md") {
    .logo {
      //   top: 3rem;
    }

    .form-container {
      width: min-content;
    }
  }
}
</style>
