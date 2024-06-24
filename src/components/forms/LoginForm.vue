<template>
  <form
    class="form needs-validation"
    :class="{ 'was-validated': !v$.$invalid }"
    novalidate
    @submit.prevent="onSubmit"
  >
    <div data-cy="username-input d-flex" class="pb-2">
      <label for="usernameInput" class="form-label font-bold"
        >Nome Utente</label
      >
      <input
        type="text"
        name="username"
        id="usernameInput"
        class="form-control mt-2 w-full md:w-18rem"
        placeholder="Inserisci Nome Utente"
        autocapitalize="none"
        :class="{
          'is-invalid': v$.username.$errors.length > 0,
          'is-valid': v$.username.$dirty && v$.username.$errors.length == 0,
        }"
        v-model="v$.username.$model"
      />
      <div
        class="invalid-feedback"
        v-for="error of v$.username.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </div>
    </div>

    <div data-cy="password-input" class="mt-3">
      <label for="passwordInput" class="form-label font-bold">Password</label>
      <input
        type="password"
        name="password"
        id="passwordInput"
        class="form-control mt-2 w-full md:w-18rem"
        placeholder="Inserisci Password"
        :class="{
          'is-invalid': v$.password.$errors.length > 0,
          'is-valid': v$.password.$dirty && v$.password.$errors.length == 0,
        }"
        v-model="v$.password.$model"
      />
      <div class="flex justify-content-between">
        <div
          class="mt-5 cursor-pointer underline"
          link
          @click="recoveryPasswordDialogVisible = true"
        >
          Recupera password
        </div>
      </div>
    </div>
    <div
      v-for="error of v$.password.$errors"
      :key="error.$uid"
      class="invalid-feedback"
    >
      {{ error.$message }}
    </div>

    <div class="text-center">
      <button
        name="submit"
        type="submit"
        class="btn btn-primary mt-8 px-8 cursor-pointer"
        :class="{ disabled: v$.$invalid || showLoadingDialog }"
      >
        <span class="spinner-border" role="status" v-if="showLoadingDialog">
        </span>
        <span>Accedi </span>
      </button>
    </div>
    <Dialog
      :showHeader="false"
      v-model:visible="recoveryPasswordDialogVisible"
      modal
      dismissableMask
      header="Recupero password"
      :style="{ width: '40vw' }"
      :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
    >
      <RecoveryPasswordForm
        @emailSent="recoveryPasswordDialogVisible = false"
      ></RecoveryPasswordForm>
    </Dialog>
  </form>
</template>

<script setup>
import { inject, ref } from "vue";
import { useAuthStore } from "@/stores/index.js";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useToast } from "primevue/usetoast";
import RecoveryPasswordForm from "@/components/forms/RecoveryPasswordForm.vue";

//data
const formData = ref({
  username: undefined,
  password: undefined,
});
const toast = useToast();
const recoveryPasswordDialogVisible = ref(false);

const showLoadingDialog = inject("showLoadingDialog");

//validations
const validations = {
  username: {
    // email: helpers.withMessage("formato email non valido", email),
    required: helpers.withMessage("campo richiesto", required),
  },
  password: { required: helpers.withMessage("campo richiesto", required) },
};

const v$ = useVuelidate(validations, formData.value);
const authStore = useAuthStore();

//functions
const onSubmit = async () => {
  if (!v$.value.$invalid) {
    showLoadingDialog.value = true;
    await authStore.login({
      user_id: formData.value.username,
      password: formData.value.password,
    });
    if (authStore.token) {
      toast.add({
        severity: "success",
        summary: "Login effettuato correttamente",
        detail: "Benvenuto nella tua area personale",
        life: 2200,
        closable: false,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Login fallito",
        detail: "Controlla le credenziali inserite",
        life: 2200,
        closable: false,
      });
    }
    showLoadingDialog.value = false;
  }
};
</script>

<style lang="scss" scoped>
#login-form {
  input::placeholder {
    color: #636363;
  }

  .form-control {
    // border: 1px solid red;
  }

  .form-label {
    color: #5a5a5a;
  }

  button {
    background-color: #0f00b7;
    color: #ffffff;
  }
  button,
  input {
    font-size: 1rem;
    border-radius: 1rem;
    padding: 1rem;
    border: none;
  }

  button {
    padding: 1rem;

    .spinner-border {
      height: 1em;
      width: 1em;
    }
  }

  label {
    font-weight: 500;
    font-size: 1.5rem;
    padding-left: 1rem;
  }

  input::placeholder {
    color: #989898;
  }
}
</style>
