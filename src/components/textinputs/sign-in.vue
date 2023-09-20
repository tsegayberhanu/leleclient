<template>
  <v-card light flat tile>
    <v-alert :type="alert.classType" :value="alert.value" dismissible>{{
      alert.message
    }}</v-alert>
    <v-card-title>Sign In</v-card-title>
    <v-card-subtitle>
      sign in to your account Lorem ipsum dolor, sit amet consectetur
      adipisicing elit. Rem itaque dolores non neque? Voluptate quos
      necessitatibus laudantium quibusdam doloremque dignissimos illo corrupti
      assumenda, aliquid aperiam, facilis commodi dolore autem maiores.
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
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12" sm="7">
          <v-btn :disabled="!valid" block @click="signin" rounded>
            sign in
            <v-progress-circular
              indeterminate
              color="green"
              v-if="progress"
            ></v-progress-circular>
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-form>
    <div class="flex-container">
      <router-link :to="{ name: 'forgotpassword' }">forgotpassword</router-link>
      <router-link :to="{ name: 'signup' }" v-if="!includesignup"
        >sign up</router-link
      >
      <router-link :to="{ name: 'resendconfirmation' }"
        >Don't recieve confirmation Link</router-link
      >
    </div>
    <app-footer></app-footer>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  props: {
    includesignup: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    alert: {
      value: false,
      message: null,
      classType: null,
    },
    progress: false,
    valid: false,

    showPassword: false,
    email: "",
    password: "",
    emailRules: [
      (v) => !!v || "email is required",
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "invalid email",
    ],
    ///(?=^.{6,40}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!*^?](?=.*[\+\-\_\@\#\$\%\&])/
    passwordRules: [
      (v) => !!v || "password is required",
      (v) => (v && v.length >= 6) || "password must be six or more characters",
      (v) =>
        /^[a-zA-Z0-9]{6,30}$/.test(v) ||
        "password must contain letters small,capital leter and at least one digit",
    ],
  }),
  methods: {
    signin: function () {
      this.progress = true;
      this.valid = false;
      const user = {
        email: this.email,
        password: this.password,
      };
      const vm = this;
      const url = "http://localhost:3000/auth/signin";
      axios
        .post(url, user)
        .then(function (response) {
          if (response.data.error) {
            vm.alert.value = true;
            vm.alert.classType = "error";
            vm.alert.message = `${response.data.error}`;
            vm.progress = false;

            setTimeout(() => {
              vm.alert.value = false;
              vm.$refs.form.reset();
            }, 2000);
          } else {
            
            vm.$store.dispatch("user/setCurrentUser", response.data);
            localStorage.setItem("currentUser", JSON.stringify(response.data));
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.token}`;
            console.log(response.data.isAdmin)
            vm.$router.push({ name: "home" });
          }
        })
        .catch((error) => {
          vm.alert.value = true;
          vm.alert.classType = "error";
          vm.alert.message = `${error.message}`;
          vm.progress = false;
          vm.progress = false;
          setTimeout(() => {
            vm.alert.value = false;
            vm.$refs.form.reset();
          }, 2000);
        });
    },
  },
};
</script>
<style scoped>
.v-card {
  width: 60%;
  margin: 40px auto 0 auto;
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
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
a {
  text-decoration: none;
  padding-right: 18px;
}
</style>