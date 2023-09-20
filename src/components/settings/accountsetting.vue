<template>
  <div>
    <v-alert :type="alert.classType" :value="alert.value" dismissible>{{
      alert.message
    }}</v-alert>

    <v-card-title>
      <v-list-item-icon>
        <v-icon v-text="'mdi-settings'"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="'Account Setting'"></v-list-item-title>
      </v-list-item-content>
    </v-card-title>
    <v-card-text>
      <label for="email">Email</label>
      <v-text-field
        v-model="email"
        placeholder="Email"
        outlined
        prepend-inner-icon="mdi-email"
        name="email"
      ></v-text-field>
      <label for="username">User Name</label>
      <v-text-field
        v-model="username"
        placeholder="https://www.app.com/username"
        outlined
        name="username"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined right @click="saveChanges"> save changes </v-btn>
    </v-card-actions>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "accountsetting",
  props: ["userId"],
  data() {
    return {
      email: null,
      username: null,
      alert: {
        value: false,
        message: null,
        classType: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      getCurrentUser: "user/getCurrentUser",
    }),
  },
  methods: {
    ...mapActions({
      changeUserNameOrEmail: "user/changeUserNameOrEmail",
    }),
    saveChanges() {
      let data = null;
      if (!!this.email) {
        if (!!this.username) {
          data = {
            email: this.email,
            username: this.username,
          };
        } else {
          data = {
            email: this.email,
          };
        }
      } else if (!!this.username) {
        data = {
          username: this.username,
        };
      }
      if (!!data) {
        const id = this.getCurrentUser._id;
        const url = `http://localhost:3000/settings/account/${id}`;

        const payload = {
          id,
          data,
        };
        const vm = this;
        vm.changeUserNameOrEmail(payload)
          .then(() => {
            vm.username=null,
            vm.email=null
            vm.alert.value = true;
            vm.alert.classType = "success";
            vm.alert.message = ` account updated successfuly`;
          })
          .catch((err) => {
            vm.alert.value = true;
            vm.alert.classType = "error";
            vm.alert.message = `${err.message}`;
          });
      }
    },
  },
};
</script>
<style scoped>
</style>