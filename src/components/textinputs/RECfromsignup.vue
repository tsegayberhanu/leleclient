<template>
  <v-card flat tile style="margin: 50px">
    <v-card-title> Send Confirmation Link </v-card-title>
    <v-card-subtitle
      >looks like we didn't send you email confirmation link? don't worry, click
      the button and we will send you a link to your email</v-card-subtitle
    >
    <v-form ref="form" v-model="valid">
      <v-card-text>
        <v-col cols="12" sm="7">
          <v-text-field
            v-model="email"
            type="email"
            label="Email"
            prepend-inner-icon="mdi-email"
            required
            :rules="emailRules"
            solo
            dense
            :readonly="!!email"
          />
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12" sm="7">
          <v-btn @click="resend" block rounded :disabled="!valid"
            >send me confirmation link</v-btn
          >
        </v-col>
      </v-card-actions>
      <div class="flex-container">
        <router-link :to="{ name: 'signin' }">sign in</router-link>
        <router-link :to="{ name: 'signup' }">sign up</router-link>
      </div>
    </v-form>
    <app-footer></app-footer>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  props: ["email"],
  data: () => ({
    valid: false,
    emailRules: [
      (v) => !!v || "email is required",
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "invalid email",
    ],
  }),
  methods: {
    resend: function () {
      const url = "http://localhost:3000/auth/resendemailconfirmation";
      axios
        .post(url, { email: this.email })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error.message);
        });
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