<template>
  <v-card flat tile>
    <v-alert :type="alert.classType" :value="alert.value" dismissible>{{
      alert.message
    }}</v-alert>
    <v-card-title>Forgot Password</v-card-title>
    <v-card-subtitle
      >you forgot your password, in order to reset it enter your email address
      where you created by this account.</v-card-subtitle
    >
    <v-form ref="form" v-model="valid">
      <v-card-text>
        <v-col cols="12" sm="7">
          <v-text-field
            v-model="email"
            label="Email"
            prepend-inner-icon="mdi-email"
            required
            :error-messages="validateEmail"
            solo
            dense
          />
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12" sm="7">
          <v-btn block rounded :disabled="!valid" @click="forgotPassword"
            >send me reset password link
            <v-progress-circular
              indeterminate
              color="green"
              v-if="progress"
            ></v-progress-circular>
          </v-btn>
        </v-col>
      </v-card-actions>
      <div class="flex-container">
        <router-link :to="{name:'signin'}">sign in</router-link>
        <router-link :to="{name:'signup'}">sign up</router-link>
      </div>
    </v-form>
    <app-footer></app-footer>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    alert: {
      value: false,
      message: null,
      classType: null,
    },
    valid: false,
    emails: ["hello@gmail.com", "bello@gmail.com", "fello@gmail.com"],
    email: null,
    progress: false,
  }),
  methods: {
    forgotPassword() {
      this.progress = true;
      this.valid = false;
      const vm = this;
      const url = "http://localhost:3000/auth/forgotpassword";
      const email = this.email;
      axios
        .post(url, { email})
        .then(function (response) {
          if (response.data.error) {
            vm.alert.classType = "error";
            vm.alert.message = `${response.data.error}`;
            vm.alert.value = true;
            vm.progress = false;
            vm.valid = true 
          } else if (response.data.success) {
            vm.progress = false;
            vm.alert.classType = "success";
            vm.alert.message = `${response.data.success}`;
            vm.alert.value = true;
            setTimeout(() => {
              vm.alert.value = false;
            }, 8000);
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },
  },
  computed: {
    validateEmail: function () {
      if (this.email) {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
          return "";
        }
        return "invalid email";
      }
      return "email is required";
    },
  },
};
</script>
<style scoped>
.v-card__text {
  padding: 0;
}
.v-card__title,
.v-card__subtitle {
  padding-top: 14px;
  padding-left: 0;
}
.v-card__text,
.v-card__actions {
  padding: 0;
}
.col-sm-7,
.col-12 {
  padding: 0 0 12px 0;
  margin: 0;
}
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
a {
  text-decoration: none;
  padding: 0 11px 0 7px;
}
</style>