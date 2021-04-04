<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import Vue from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
Vue.use(VueToast);

export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
