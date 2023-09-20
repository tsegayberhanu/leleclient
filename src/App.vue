<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
import localUser from "./modules/localUser";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters({
      getCurrentUser: "user/getCurrentUser",
      findUserById: "user/findUserById",
      getUsers: "user/getUsers",
    }),
  },
  methods: {
    ...mapActions({
      loadUsers: "user/loadUsers",
    }),
  },
  created() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      if (!this.getCurrentUser && !this.getUsers.length) {
        this.loadUsers().then(() => {
          console.log(this.getUsers);
          console.log(this.getCurrentUser);
        });
      }
    }
  },
};
</script>

<style >
.nnn {
  display: grid;
  margin: 1% 2.5% 0 2.5%;
  grid-column-gap: 6px;
  grid-row-gap: 6px;
  grid-template-columns: 1fr 1fr 1fr;
}
.one,
.two,
.three,
.four,
.five,
.six,
.seven,
.eight,
.nine,
.ten {
  width: 10%;
  background-color: aqua;
}
.maindisplay {
  width: 55%;
}
.advertise {
  width: 25%;
  background-color: brown;
}
a {
  text-decoration: none;
}
</style>
