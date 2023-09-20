<template>
  <div>
    <app-header></app-header>
    <v-list
      v-for="request in getCurrentUser.friendRequiests"
      :key="request.userId"
    >
      <v-list-item class="pa-0">
        <v-avatar size="48">
          <img
            :src="findUserId(request.userId).avaterUrl"
            :alt="findUserId(request.userId).username"
          />
        </v-avatar>
        <v-list-item-content class="ml-4">
          <v-list-item-title>
            <router-link
              :to="{
                name: 'user',
                params: {
                  userId: request.userId,
                  username: findUserId(request.userId).username,
                },
              }"
              style="text-decoration: none"
            >
              {{ findUserId(request.userId).username }}
            </router-link>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ findUserId(request.userId).username.length }} mutual friends
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>
            <v-btn text outlined color="#1976d2" class="pl-0" small>
              <v-icon>mdi-plus</v-icon>
              <span class="italic">unfriend</span>
            </v-btn>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <app-footer></app-footer>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getCurrentUser: "user/getCurrentUser",
      findUserId: "user/findUserId",
    }),
  },
};
</script>