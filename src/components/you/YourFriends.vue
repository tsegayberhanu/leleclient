<template>
  <div>
    <app-header></app-header>
    <v-row no-gutters>
      <v-col cols="1" />
      <v-col cols="6">
        <v-card>
          <v-card-title class="pb-0 pt-0"> All Friends </v-card-title>
          <v-card-subtitle class="pa-0 mt-2 ml-3 mr-3">
            <v-text-field
              v-model="searchFriend"
              rounded
              outlined
              dense
              placeholder="Search Friends"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
            <v-divider />
          </v-card-subtitle>
          <v-card-text>
            <v-list>
              <span
                >{{
                  getAllYourFriends.length > 0
                    ? getAllYourFriends.length == 1
                      ? "1\t\tFriend"
                      : getAllYourFriends.length + "\t\tFriends"
                    : " no friends to show"
                }}
              </span>
              <v-list-item
                v-for="user of getAllYourFriends"
                :key="user._id"
                class="pa-0"
              >
                <v-avatar size="48">
                  <img :src="user.avaterUrl" :alt="user.username" />
                </v-avatar>
                <v-list-item-content class="ml-4">
                  <v-list-item-title>
                    <router-link
                      :to="{ name: 'user', params: { userId: user._id, username: user.username } }"
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
                    <v-btn text outlined color="#1976d2" class="pl-0" small @click="unfriend">
                      <v-icon>mdi-plus</v-icon>
                      <span class="italic">unfriend</span>
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="1" />
    </v-row>
    <app-footer></app-footer>
  </div>
</template>
<script>
import { mapGetters, mapActions} from "vuex";
import leftsidebar from "../Application/leftsidebar";
export default {
  props: ["userId"],
  data() {
    return {
      searchFriend: "",
    };
  },
  components: {
    "left-side-bar": leftsidebar,
  },
  computed: {
    ...mapGetters({
      findUserById: "user/findUserById",
      getCurrentUser: "user/getCurrentUser",
      getUsers: "user/getUsers",
    }),
    getAllYourFriends() {
      const friends = this.getCurrentUser.friends.map((element) =>
        this.findUserById(element.userId)
      );
     return friends.filter(friend => friend.username.includes(this.searchFriend))
    },
  },
  methods: {
     ...mapActions({
      unFriend: "user/unFriend",
    }),
    unfriend(userId) {
      const friend = {
        unfrienderId: this.getCurrentUser._id,
        unfriendeeId: userId,
      };
      this.unFriend(friend);
    },
  },
};
</script>