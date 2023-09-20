<template>
  <v-app>
    <app-header></app-header>
    <v-container fluid>
      <v-row auto>
        <v-col cols="3" class="leftnav">
          <left-side-bar />
        </v-col>
        <v-col cols="3"></v-col>
        <v-col cols="6" class="mn">
          <v-card class="mb-4" outlined>
            <v-card-text>
              <basic-input></basic-input>
            </v-card-text>
            <v-card-actions></v-card-actions>
          </v-card>

          <ahiyo-post></ahiyo-post>
        </v-col>
        <v-col cols="3" class="ads">
          <v-card>
            <v-card-text
              >Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Assumenda ratione eum dignissimos sapiente, nostrum maiores
              cupiditate nam ut illum consequuntur sint rem alias deleniti,
              rerum quos expedita obcaecati aperiam</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <app-footer></app-footer>
  </v-app>
</template>
<script>
import ahiyo from "../views/post/ahiyo";
import leftsidebar from "../components/Application/leftsidebar";
import basicIinput from "../components/dialog";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "ahiyo-post": ahiyo,
    "left-side-bar": leftsidebar,
    "basic-input": basicIinput,
  },
  computed: {
    ...mapGetters({
      findUserById: "user/findUserById",
    }),
  },
  methods: {
    ...mapActions({
      loadUsers: "user/loadUsers",
      loadPosts: "loadPosts",
      setCurrentUser: "user/setCurrentUser",
    }),
  },
  mounted() {
    this.loadUsers();
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      const currentUser = user._id ? this.findUserById(user._id) : undefined;
      if (currentUser) {
        this.setCurrentUser(currentUser);
      }
    }
    this.loadPosts();
  },
};
</script>
<style scoped>
.leftnav {
  position: fixed;
  overflow-y: scroll;
  padding-bottom: 140px;
  height: 100%;
}
</style>