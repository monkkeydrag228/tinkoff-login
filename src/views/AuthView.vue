<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>

    <div :class="['form-control', { invalid: eError }]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur" />
      <small v-if="eError">{{ eError }}</small>
    </div>
    <div :class="['form-control', { invalid: pError }]">
      <label for="password">Пароль</label>
      <input :type="inputType" id="password" v-model="password" @blur="pBlur" />

      <small v-if="pError">{{ pError }}</small>
     
    </div>
   

    <button
      class="btn primary"
      type="submit"
      :disabled="isSubmitting || isTooManyAttempts"
    >
      Войти
    </button>
    <div class="text-danger" v-if="isTooManyAttempts">
      Вы слишком часто пытаетесь войти в систему. Попробуйте позже
    </div>
    <button class="btn" @click.prevent="toggleInput">{{ buttonText }}</button>
  </form>
</template>

<script>
import { ref,computed } from 'vue'; // Import ref from Vue

import { error } from "@/utils/error";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useLoginForm } from "../use/login-forms";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    
    // Use ref to create a reactive reference to inputType
    const inputType = ref('password');

    if (route.query.message) {
      store.dispatch("setMessage", {
        value: error(route.query.message),
        type: "warning",
      });
    }

    const toggleInput = () => {
      // Use value property to update the value of inputType
      inputType.value = inputType.value === 'password' ? 'text' : 'password';
    };
    

    return {
      ...useLoginForm(),
      toggleInput,
      // Return inputType as a ref
      inputType,
      buttonText: computed(() => {
        return inputType.value === 'password' ? 'Показать' : 'Скрыть';
      })
    };
  },
};
</script>
