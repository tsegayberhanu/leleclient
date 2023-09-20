<template>
  <div>
    <v-row
      v-for="request of friendRequests"
      :key="request.userId"
      class="ml-1 mr-1"
    >
      <v-list dense nav>
        <v-list-item link>
          <v-list-item-avatar>
            <img
              :src="findUserById(request.userId).avaterUrl"
              @click="goto(request.userId)"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-row no-gutters>
              <v-col class="pt-0">
                <v-list-item-title>
                  <v-btn
                    color="#1976d2"
                    text
                    :to="{
                      name: 'user',
                      params: {
                        userId: request.userId,
                        username: findUserById(request.userId).username,
                      },
                    }"
                    small
                  >
                    {{ findUserById(request.userId).username }}
                  </v-btn>
                  <span class="mr-1"> send you a friend request</span>
                </v-list-item-title>
              </v-col>
              <v-col class="pt-0">
                <v-list-item-title>
                  <v-btn
                    text
                    color="#1976d2"
                    class="mr-3"
                    small
                    @click="acceptrequest(request.userId)"
                  >
                    accept request
                  </v-btn>
                </v-list-item-title>
              </v-col>
              <v-col class="pt-0">
                <v-list-item-title>
                  <v-btn
                    text
                    color="#1976d2"
                    small
                    @click="denyrequest(request.userId)"
                  >
                    deny request
                  </v-btn>
                </v-list-item-title>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      findUserById: "user/findUserById",
      getCurrentUser: "user/getCurrentUser",
    }),
    user() {
      return this.getCurrentUser;
    },
    friendRequests() {
      return this.getCurrentUser.friendRequiests;
    },
  },
  methods: {
    ...mapActions({
      confirmFriendRequest: "user/confirmFriendRequest",
      denyFriendRequest: "user/denyFriendRequest",
    }),
    goto(userId) {
      this.$router.push({
        name: "user",
        params: { userId, username: this.findUserById(userId).username },
      });
    },
    acceptrequest(userId) {
      const request = {
        confirmerId: this.getCurrentUser._id,
        confirmeeId: userId,
      };
      this.confirmFriendRequest(request);
    },
    denyrequest(userId) {
      const deny = {
        denyerId: this.getCurrentUser._id,
        denyeeId: userId,
      };
      this.denyFriendRequest(deny);
    },
  },
};
</script>