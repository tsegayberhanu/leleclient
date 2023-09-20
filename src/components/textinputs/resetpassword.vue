<template>
  <v-card flat tile>
    <v-alert :type="alert.classType" :value="alert.value" dismissible>{{
      alert.message
    }}</v-alert>
    <v-card-title>Reset Password</v-card-title>
    <v-card-subtitle
      >you forgot your password reset it here.make sure to enter a secure
      password instead of simple passwords</v-card-subtitle
    >
    <v-form ref="form" v-model="valid">
      <v-card-text>
        <v-col cols="12" sm="7">
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="New Password"
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
            :rules="confirmPasswordRules"
            required
            solo
            dense
          />
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12" sm="7">
          <v-btn block rounded :disabled="!valid" @click="forgotPassword">
            reset password
            <v-progress-circular
              indeterminate
              color="green"
              v-if="progress"
            ></v-progress-circular>
          </v-btn>
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
  data: function () {
    return {
      alert: {
        value: false,
        message: null,
        classType: null,
      },
      password: null,
      confirmPassword: null,
      showPassword: false,
      username: null,
      token: null,
      progress: false,
      valid: false,
      passwordRules: [
        (v) => !!v || "password is required",
        (v) =>
          (v && v.length >= 6) || "password must be six or more characters",
        (v) =>
          /^[a-zA-Z0-9]{6,30}$/.test(v) ||
          "password must contain letters small,capital leter and at least one digit,and at least one symbol from these[+,-,_,@,#,$,%,&]",
      ],
    };
  },
  computed: {
    confirmPasswordRules() {
      const vm = this;
      return [
        (v) => !!v || "confirm Password is required",
        () =>
          vm.password === vm.confirmPassword ||
          "Password must match each other",
      ];
    },
  },
  methods: {
    forgotPassword() {
      this.valid = false;
      this.progress = true;
      const vm = this;
      this.username = this.$route.query.username;
      this.token = this.$route.query.token;
      console.log({ token: this.token, username: this.username });
      const url = `http://localhost:3000/auth/resetpassword/${this.username}/${this.token}`;
      axios
        .post(url, {
          newPassword: this.password,
          confirmPassword: this.confirmPassword,
        })
        .then(function (response) {
          if (response.data.success) {
            vm.alert.classType = "success";
            vm.alert.message = `${response.data.success},now you can sign in to your account`;
            vm.alert.value = true;
            setTimeout(() => {
              vm.$router.push("/signin");
            }, 3000);
          } else if (response.data.error) {
            console.log({ error: response.data.error });
          } else {
            console.log("network error try again");
          }
        })
        .catch(function (error) {
          console.log({ error: error.message });
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

