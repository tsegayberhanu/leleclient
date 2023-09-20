<template>
  <div>
    <v-card-title>
      <v-list-item-icon>
        <v-icon v-text="'mdi-delete'" color="red"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="'Delete Account'"></v-list-item-title>
      </v-list-item-content>
    </v-card-title>
    <v-card-text>
      <v-alert dense type="warning" color="red">
        Once you delete your account you will no longer access it again
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" @click="deleteAccount"> delete my account </v-btn>
    </v-card-actions>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "deletesetting",
  props: ["userId"],
  methods: {
    deleteAccount() {
      const vm = this;
      const url = `http://localhost:3000/users/deleteaccount/${this.userId}`;
      axios
        .post(url)
        .then((result) => {
          console.log(result);
        })
        .then(() => {
         localStorage.removeItem("currentUser");
        })
        .then(() => {
          vm.$router.push({ name: "index" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>