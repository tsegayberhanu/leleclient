<template>
  <v-card  flat tile>
    <v-alert :type="alert.classType" :value="alert.value" dismissible>{{
      alert.message
    }}</v-alert>
    <v-card-text>
      <p>click the link below to confirm your email</p>
    </v-card-text>
    <v-card-actions>
      <v-btn text block @click="confirmemail" :disabled="!disable"
        >confirm your email</v-btn
      >
    </v-card-actions>
    <app-footer></app-footer>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    disable: true,
    username: null,
    token: null,
    alert: {
      value: false,
      message: null,
      classType: null,
    },
  }),
  methods: {
    confirmemail() {
      this.disable = false;
      this.username = this.$route.query.username;
      this.token = this.$route.query.token;
      const vm = this;
      if (this.username && this.token) {
        axios
          .get(
            `http://localhost:3000/auth/confirmemail/${this.username}/${this.token}`
          )
          .then((response) => {
            if (response.data.success) {
              vm.alert.classType = "success";
              vm.alert.message = `${response.data.success},now you can sign in to your account`;
              vm.alert.value = true;
              setTimeout(() => {
                vm.$router.push("/signin");
              }, 3000);
            } else if (response.data.error) {
              console.log(response.data.error);
            } else {
              console.log("network error try again");
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
      else{
        this.alert.value = true
        this.alert.classType = 'error'
        this.alert.message = "invalid confirmation attempt"
      }
    },
  },
};
</script>
<style scoped>
.v-card {
  margin: 60px auto;
}
</style>