<template>
  <v-row class="mb-6" no-gutters>
    <v-col cols="6">
      <signin includesignup />
    </v-col>
    <v-col cols="6">
      <signup includesignin />
    </v-col>
      <app-footer></app-footer>
  </v-row>
</template>
<script>
import signin from "../textinputs/sign-in";
import signup from "../textinputs/sign-up";
import appFooter from "../Application/AppFooter";
export default {
  components: {
    signin,
    signup,
    "app-footer": appFooter,
  },
};
</script>
<style scoped>
.v-card {
  width: 100%;
}
.col.col-6 {
  padding: 0 20px;
}
</style>