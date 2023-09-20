<template>
  <div>
    <v-app-bar tile flat app>
      <router-link :to="{ name: 'home' }" id="appname">
        <span class="font-italic font-weight-regular">Introverts</span>
      </router-link>
      <v-text-field
        v-model="searchtext"
        rounded
        outlined
        dense
        placeholder="Search App"
        append-icon="mdi-magnify"
        style="margin: 30px 0 0 22px"
        @click:append="search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn text v-if="isAdmin" @click="goToAdminDashboard">
        manage app
      </v-btn>

      <v-btn icon @click="goToHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="red">mdi-contacts</v-icon>
          </v-btn>
        </template>
        <v-list>
          <friend-requests />
        </v-list>
      </v-menu>
      
      <v-btn icon @click="goToSetting">
        <v-icon>mdi-settings</v-icon>
      </v-btn>

      

      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>
        <v-list>
          <app-notification />
        </v-list>
      </v-menu>

      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon v-text="'mdi-account'"></v-icon>
            </v-list-item-icon>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <app-footer />
  </div>
</template>
<script>
import axios from "axios";
import appnotification from "./AppNotification.vue";
import friendRequests from "../user/friendRequests.vue"
import poepleYouMayKnow from '../user/poepleYouMayKnow.vue'
import { mapGetters } from 'vuex';
export default {
  name: "AppHeader",
  data() {
    return {
      searchtext: undefined,
      items: [
        { title: "Setting", icon: "mdi-settings" },
        { title: "Privacy", icon: "mdi-lock" },
        { title: "Log Out", icon: "mdi-account" },
      ],
    };
  },
  components: {
    "app-notification": appnotification,
    "friend-requests": friendRequests,
    "poeple-you-may-know": poepleYouMayKnow
  },
  computed:{
    ...mapGetters({
      getCurrentUser:"user/getCurrentUser"
    }),
    isAdmin(){
      
      return this.getCurrentUser?this.getCurrentUser.isAdmin:false
    }
  },
  methods: {
       search() {
      const search = this.searchtext;
      const vm = this;
      const url = `http://localhost:3000/users/search?username=${search}`;
      axios
        .get(url)
        .then(function (response) {
          console.log(response.data);
          return response.data.message;
        })
        .then((result) => {
          vm.$router.push({
            name: "searchResult",
            params: { result },
            query: { search },
          });
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },
    goToAdminDashboard(){
      this.$router.push({name:'adminDashboard'})
    },
    goToHome() {
      this.$router
        .push({ name: "home" })
        .then((onComplete) => {
          // when every thing goes right
          console.log("sucessfully navigated");
        })
        .catch((anAbourt) => {
          //when Error ocured
          console.log("problem Occured");
        });
    },
    goToSetting() {
      this.$router.push({ name: "settings", params:{username: this.getCurrentUser.username} });
    },
    logout() {
      this.$store.dispatch("user/setCurrentUser", null);
      localStorage.removeItem("currentUser");
      this.$router.push({ name: "signin" });
    },
  },
};
</script>
<style scoped>
#appname {
  cursor: pointer;
  text-decoration: none;
}
</style>