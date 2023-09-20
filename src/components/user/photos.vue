<template>
  <v-card >
    <v-card-title>
        <span> photos </span>
      <v-spacer></v-spacer>
      <router-link to=""> see all photos </router-link>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-row >
        <v-col class="pr-1 pb-0 pt-0" >
          <v-list-item class="pa-0">
            <img
              :src="user.avaterUrl"
              :alt="user.username"
              height="100"
              width="125"
            />
          </v-list-item>
        </v-col>
        <v-col class="pb-0 pl-0 pt-0">
          <v-list-item class="pa-0">
            <img
              :src="user.coverPhotoUrl"
              :alt="user.username"
              height="100"
              width="125"
            />
          </v-list-item>
        </v-col>
        </v-row>  
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["userId"],
  computed: {
    ...mapGetters({
      findUserById: "user/findUserById",
    }),
    user() {
      return this.findUserById(this.userId);
    },
  },
};
</script>