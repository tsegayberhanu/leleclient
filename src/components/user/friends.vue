<template>
  <v-card outlined v-if="getFriendsOfAUser(userId).length > 0">
    <v-card-title>
      <span> friends </span>
      <v-spacer></v-spacer>
      <router-link to=""> see all friends </router-link>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col v-for="user in getFriendsOfAUser(userId)" :key="user._id">
          <v-list-item class="pa-0">
            <v-avatar size="48">
              <img :src="user.avaterUrl" :alt="user.username" />
            </v-avatar>
            <v-list-item-content class="ml-4">
              <v-list-item-title>
                <router-link
                  :to="{
                    name: 'user',
                    params: { userId: user._id, username: user.username },
                  }"
                  style="text-decoration: none"
                >
                  {{ user.username }}
                </router-link>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ user.username.length }} mutual friends
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>
                <v-btn
                  text
                  outlined
                  color="#1976d2"
                  class="pl-0"
                  small
                  @click="unfriend"
                >
                  <v-icon>mdi-plus</v-icon>
                  <span class="italic">unfriend</span>
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["userId"],
  computed: {
    ...mapGetters({
      getUsers: "user/getUsers",
      getFriendsOfAUser: "user/getFriendsOfAUser",
      getCurrentUser: "user/getCurrentUser",
    }),
  },
  methods: {
    ...mapActions({
      unFriend: "user/unFriend",
    }),
    unfriend() {
      const friend = {
        unfrienderId: this.getCurrentUser._id,
        unfriendeeId: this.userId,
      };
      this.unFriend(friend);
    },
  },
};
</script>