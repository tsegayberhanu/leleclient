<template>
  <div>
    <v-card-title>
      <v-list-item-icon>
        <v-icon v-text="'mdi-lock'"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="'Change Password'"></v-list-item-title>
      </v-list-item-content>
    </v-card-title>
    <v-card-subtitle>
     <v-alert :type="type" v-if="show" dismissible>
      {{message}}
    </v-alert>
    </v-card-subtitle>
    <v-card-text>
      <label for="currentpassword">Current Password</label>
      <v-text-field
        v-model="currentPassword"
        placeholder="current password"
        outlined
        prepend-inner-icon="mdi-lock"
        name="currentpassword"
        type="password"
        append-icon="mdi-eye"
      ></v-text-field>
      <v-row>
        <v-col cols="6">
          <label for="newpassword">New Password</label>
          <v-text-field
            v-model="newPassword"
            placeholder="new password"
            outlined
            prepend-inner-icon="mdi-lock"
            name="newpassword"
            type="password"
            append-icon="mdi-eye"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <label for="confirmpassword">Confirm Password</label>
          <v-text-field
            v-model="confirmPassword"
            placeholder="confirm password"
            outlined
            prepend-inner-icon="mdi-lock"
            name="confirmpassword"
            type="password"
            append-icon="mdi-eye"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined right @click="changepassword"> change Password </v-btn>
    </v-card-actions>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "passwordsetting",
  props: ["userId"],
  data() {
    return {
      currentPassword: undefined,
      newPassword: undefined,
      confirmPassword: undefined,
      type:undefined,
      show:false,
      message:undefined
    };
  },
  methods: {
    changepassword() {
      this.show = false
      let data = {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      };
      const url = ` http://localhost:3000/settings/changepassword/${this.userId}`;
      axios.post(url, data).then((response) => {
       if(response.data.error){
          this.message = response.data.error
          this.type = 'error',
          this.show = true
       }
       else{
         this.message = response.data.message
          this.type = 'success',
          this.show = true
       }
      });
    },
  },
};
</script>
<style scoped>
</style>