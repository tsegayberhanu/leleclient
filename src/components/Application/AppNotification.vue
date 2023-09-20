<template>
  <div>
    <v-card-text class="pt-0 pb-0">
      <v-list
        v-for="notification in getSignedInUser.notifications"
        :key="notification.notificationTime"
        class="pt-0 pb-2"
      >
        <v-list-item
          :to="{
            name: 'user',
            params: {
              userId: notification.userId,
              username: findUserById(notification.userId).username,
            },
          }"
        >
          <v-list-item-avatar>
            <img :src="findUserById(notification.userId).avaterUrl" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ findUserById(notification.userId).username }}
            </v-list-item-title>
            <v-list-item-title>
              {{ notification.reason }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["userId"],
  name: "App-Notification",
  computed: {
    ...mapGetters({
      getSignedInUser: "user/getCurrentUser",
      findUserById: "user/findUserById",
    }),
  },
};
</script>