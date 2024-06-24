<template>
  <div class="login-form flex flex-column gap-3">
    <div class="flex flex-column gap-2">
      <label for="userId">Email</label>
      <InputText
        type="text"
        v-model="v$.userEmail.$model"
        inputId="userId"
        placeholder="Inserisci un @mail valida"
        :class="{ 'p-invalid': v$.userEmail.$error }"
      />
      <InlineMessage v-for="error in v$.userEmail.$errors">{{
        error.$message
      }}</InlineMessage>
    </div>

    <Button
      class="flex center py-3"
      severity="primary"
      @click="onSubmit"
      :disabled="!v$.$dirty || v$.$invalid || loading"
      :class="{ 'opacity-40': !v$.$dirty || v$.$invalid || loading }"
      >Invia email</Button
    >
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, email } from "@vuelidate/validators";
import InlineMessage from "primevue/inlinemessage";
import InputText from "primevue/inputtext";
import { Admin } from "@/api/index.js";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const emit = defineEmits(["emailSent"]);

const loading = ref(false);

const formData = reactive({
  userEmail: "",
});

const validations = {
  userEmail: {
    required: helpers.withMessage("Campo obbligatorio", required),
    email: helpers.withMessage("Inserire una mail valida", email),
  },
};

const v$ = useVuelidate(validations, formData, { $lazy: true });

const onSubmit = async () => {
  v$.value.$validate();
  v$.value.$touch();

  loading.value = true;

  const resp = await Admin.resetPassword({
    uu: formData.userEmail,
  });

  if (resp.data.result === "OK") {
    loading.value = false;
    toast.add({
      severity: "success",
      summary: "Email inviata",
      detail: "Controlla la tua casella di posta",
      life: 2200,
      closable: false,
    });
    emit("emailSent");
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
</style>
