<template>
  <div>
    <v-list dense nav>
      <v-list-item
        :to="{
          name: 'user',
          params: {
            userId: getCurrentUser._id,
            username: getCurrentUser.username,
          },
        }"
      >
        <v-list-item-avatar>
          <img :src="getCurrentUser.avaterUrl" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ getCurrentUser.username }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :to="linkTo[index]"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getCurrentUser: "user/getCurrentUser",
      getUsers: "user/getUsers",
    }),
    linkTo() {
      return [
        { name: "YourFriends"},
        { name: "YourPhotos"},
        { name: "YourBio" },
      ];
    },
  },
  data() {
    return {
      vm: this,
      items: [
        { title: "Friends", icon: "mdi-account-supervisor" },
        { title: "Photos", icon: "mdi-google-photos" },
        { title: "About", icon: "mdi-account-details" },
      ],
    };
  },
};
</script>