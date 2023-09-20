<template>
  <v-card outlined v-if="notHidden && getPeopleYouMayKnow.length " >
    <v-card-title class="pt-0 pb-0">
      <v-row>
        <v-col> poeple you may know</v-col>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mt-3" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon v-text="'mdi-account-multiple'"></v-icon>
              </v-list-item-icon>
              <v-list-item-title>see all suggestions</v-list-item-title>
            </v-list-item>
            <v-list-item @click="hide">
              <v-list-item-icon>
                <v-icon v-text="'mdi-cancel'"></v-icon>
              </v-list-item-icon>
              <v-list-item-title>hide people you may know</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row no-gutters v-if="getPeopleYouMayKnow">
        <v-col
          v-for="user in getPeopleYouMayKnow"
          :key="user._id"
          class="pr-2"
          cols="2"
        >
          <v-card outlined max-width="100%" class="mr-0">
            <v-img
              :src="user.avaterUrl"
              max-height="140"
              min-width="100%"
            ></v-img>
            <v-card-title class="ma-0 pt-0">
              <v-list class="pa-0">
                <v-list-item class="pa-0 ma-0">
                  <v-list-item-content class="pa-0">
                    <router-link
                      :to="{ name: 'user', params: { userId: user._id, username:user.username } }"
                      style="color: black"
                    >
                      {{ user.username }}
                    </router-link>
                    <v-list-item-subtitle>
                      {{ user.username.length }} mutual friends
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item class="pa-0">
                  <v-card-actions class="pa-0">
                    <v-btn
                      text
                      outlined
                      color="#1976d2"
                      x-small
                      @click="cancelrequest(user._id)"
                      v-if="checkForFriendShip(user)"
                    >
                      <v-icon> mdi-account </v-icon>
                      <span class="italic"> cancel request </span>
                    </v-btn>

                    <v-btn
                      text
                      outlined
                      color="#1976d2"
                      small
                      @click="addfriend(user._id)"
                      v-else
                    >
                      <v-icon> mdi-account </v-icon>
                      add friend
                    </v-btn>
                  </v-card-actions>
                </v-list-item>
              </v-list>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["userId"],
  data() {
    return {
      notHidden: true,
      page: 0,
    };
  },
  computed: {
    ...mapGetters({
      getUsers: "user/getUsers",
      getCurrentUser: "user/getCurrentUser",
      findUserById: "user/findUserById",
    }),

    getPeopleYouMayKnow() {
      return this.getUsers.filter(
        (user) =>
          !this.areUfriendsWithThisUser(user._id) &&
          !this.doUSendHimAFriendRequest(user._id) &&
          !this.didHeSendUAFriedRequest(user._id) &&
          !this.areUThisUser(user._id)
      );
    },
  },
  methods: {
    ...mapActions({
      addFriend: "user/addFriend",
      cancelRequest: "user/cancelRequest",
    }),

    areUfriendsWithThisUser: function (id) {
      return !!this.getCurrentUser.friends.find(
        (friend) => friend.userId == id
      );
    },
    doUSendHimAFriendRequest: function (id) {
      return !!this.findUserById(id).friendRequiests.find(
        (friend) => friend.userId == this.getCurrentUser._id
      );
    },
    didHeSendUAFriedRequest: function (id) {
      return !!this.getCurrentUser.friendRequiests.find(
        (friend) => friend.userId == id
      );
    },
    areUThisUser: function (id) {
      return id == this.getCurrentUser._id;
    },

    checkForFriendShip(user) {
      let bool = user.friendRequiests.find(
        (request) => request.userId == this.getCurrentUser._id
      );
      return !!bool;
    },
    hide() {
      this.notHidden = false;
    },
    addfriend(id) {
      const request = {
        requesterId: this.getCurrentUser._id,
        requesteeId: id,
      };
      this.addFriend(request);
    },
    cancelrequest(id) {
      const request = {
        requesterId: this.getCurrentUser._id,
        requesteeId: id,
      };
      this.cancelRequest(request);
    },
  },
};
</script>