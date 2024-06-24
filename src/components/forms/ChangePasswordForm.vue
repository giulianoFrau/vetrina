<template>
  <form
    class="login-form flex flex-column gap-3"
    autocomplete="off"
    @submit="onSubmit"
  >
    <div class="flex flex-column gap-2">
      <label for="password">Password Attuale</label>
      <Password
        :inputProps="{ autocomplete: 'false' }"
        type="password"
        toggleMask
        v-model="v$.userPasswordOld.$model"
        inputId="password"
        placeholder="Inserisci l'attuale password"
        inputClass="w-full"
        :feedback="false"
        :class="{ 'p-invalid': v$.userPasswordOld.$error }"
      />
      <InlineMessage v-for="error in v$.userPasswordOld.$errors">{{
        error.$message
      }}</InlineMessage>
    </div>
    <div class="flex flex-column gap-2 w-full">
      <label for="password">Nuova Password</label>
      <Password
        type="password"
        :inputProps="{ autocomplete: 'false' }"
        toggleMask
        v-model="v$.userPasswordNew.$model"
        inputId="password"
        placeholder="Inserisci la nuova password"
        inputClass="w-full"
        :feedback="false"
        :class="{ 'p-invalid': v$.userPasswordNew.$error }"
      />
      <InlineMessage v-for="error in v$.userPasswordNew.$errors">{{
        error.$message
      }}</InlineMessage>
    </div>

    <Button
      class="btn-submit flex center py-3"
      type="submit"
      :disabled="!v$.$dirty || v$.$invalid || loading"
      :class="{ 'opacity-40': !v$.$dirty || v$.$invalid || loading }"
      >Conferma</Button
    >
  </form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import InlineMessage from "primevue/inlinemessage";
import Password from "primevue/password";
import { Admin } from "@/api/index.js";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "@/stores";
const toast = useToast();
const authStore = useAuthStore();
const emit = defineEmits(["updatePassword"]);

const loading = ref(false);

const formData = reactive({
  userPasswordOld: "",
  userPasswordNew: "",
});

const validations = {
  userPasswordOld: {
    required: helpers.withMessage("Campo obbligatorio", required),
  },
  userPasswordNew: {
    required: helpers.withMessage("Campo obbligatorio", required),
  },
};

const v$ = useVuelidate(validations, formData, { $lazy: true });

const onSubmit = async () => {
  v$.value.$validate();
  v$.value.$touch();

  loading.value = true;

  const resp = await Admin.changePassword({
    old_pwd: formData.userPasswordOld,
    new_pwd: formData.userPasswordNew,
    token: authStore.token,
  });

  if (resp.data.result === "OK") {
    loading.value = false;
    emit("updatePassword");
    toast.add({
      severity: "success",
      summary: "Richiesta inviata",
      detail: "Password cambiata con successo",
      life: 2200,
      closable: false,
    });
  } else {
    loading.value = false;
    toast.add({
      severity: "error",
      summary: "Attenzione",
      detail: resp.data.result,
    });
  }
};
</script>

<style lang="scss">
label {
  font-weight: 500;
  font-size: 1.2rem;
  padding-left: 1rem;
}

input::placeholder {
  color: #989898;
}

.btn-submit {
  background-color: #0f00b7 !important;
  color: white !important;
  border: none;
}
</style>
