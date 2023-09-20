<template>
  <v-card light flat tile>
    <v-alert :type="alert.classType" :value="alert.value" dismissible>{{
      alert.message
    }}</v-alert>
    <v-card-title>Sign up</v-card-title>
    <v-card-subtitle>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis
      reiciendis ad omnis porro illum dicta, nesciunt amet, totam similique eum
      incidunt dolore aperiam nulla, possimus sequi expedita nihil doloremque
      esse. lo
    </v-card-subtitle>
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
          />
          <v-text-field
            v-model="userName"
            label="User Name"
            prepend-inner-icon="mdi-account"
            required
            :rules="userNameRules"
            solo
            dense
          />
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-inner-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
            :rules="passwordRules"
            solo
            dense
          />
          <v-text-field
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            label="Confirm Password"
            prepend-inner-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
            solo
            dense
          />
          <v-checkbox
            v-model="agreement"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree to the terms and serves's?"
            required
          ></v-checkbox>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12" sm="7">
          <v-btn rounded :disabled="!valid" block @click="onSubmit">
            sign up
            <v-progress-circular
              indeterminate
              color="green"
              v-if="progress"
            ></v-progress-circular>
          </v-btn>
        </v-col>
        <router-link :to="{name:'signin'}" v-if="!includesignin">sign in</router-link>
      </v-card-actions>
    </v-form>
    <app-footer></app-footer>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  props: {
    includesignin: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    progress: false,
    alert: {
      classType: null,
      message: null,
      value: false,
    },
    valid: false,
    showPassword: false,
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    agreement: false,
    vm: this,
    emailRules: [
      (v) => !!v || "email is required",
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "invalid email",
    ],
    userNameRules: [
      (v) => !!v || "username is required",
      (v) =>
        (v && v.length >= 2) || "username must be greater than two characters",
    ],
    passwordRules: [
      (v) => !!v || "password is required",
      (v) => (v && v.length >= 6) || "password must be six or more characters",
      (v) =>
        /^[a-zA-Z0-9]{6,30}$/.test(v) ||
        "password must contain letters small,capital leter and at least one digit,and at least one symbol from these[+,-,_,@,#,$,%,&]",
    ],
    confirmPasswordRules: [
      (v) => (v && v == vm.password) || "passwords must match each other",
    ],
  }),
  methods: {
    onSubmit: function () {
      this.progress = true;
      this.valid = false;
      const user = {
        username: this.userName,
        email: this.email,
        password: this.password,
        confirm_password: this.confirmPassword,
      };
      const vm = this;
      const url = "http://localhost:3000/auth/signup";
      axios
        .post(url, user)
        .then(function (response) {
          const { success, error } = response.data;
          if (!!success && !!error) {
            vm.$router.push({name: 'sendconfirmationlink', params: {email: user.email}});
          } else {
            vm.$router.push("/signin");
          }
          //
        })
        .catch((error) => console.log(error.message));
    },
  },
};
</script>
<style scoped>
.v-card {
  width: 60%;
  margin: 30px auto 0 auto;
}
.v-card__title,
.v-card__subtitle {
  padding: 0 0 25px 0;
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
.v-input--selection-controls {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  padding-left: 18px;
}
</style>