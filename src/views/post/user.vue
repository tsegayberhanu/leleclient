<template>
  <v-container class="pa-0">
    <app-header />
    <v-card flat>
      <v-card-title>
        <v-img
          class="white--text align-end"
          max-height="300px"
          :src="findUserById(userId).coverPhotoUrl"
        >
          <cover-photo
            v-if="findUserById(userId)._id == getCurrentUser._id"
          ></cover-photo>
        </v-img>
      </v-card-title>
      <v-card-subtitle>
        <v-avatar size="64">
          <v-img
            :src="findUserById(userId).avaterUrl"
            :alt="findUserById(userId).username"
          >
            <v-btn icon v-if="findUserById(userId)._id == getCurrentUser._id">
              <profile-picture mdi="mdi-camera"></profile-picture>
            </v-btn>
          </v-img>
        </v-avatar>
        <p class="text-capitalize" style="margin-bottom: 0">
          {{ findUserById(userId).username }}
        </p>
      </v-card-subtitle>
      <v-card-text>
        <div style="margin-left: 50%; margin-bottom: 20px">
          <div v-if="doesTheUserHasBio">
            <p v-if="showBioValue" style="margin-bottom: 0">
              {{ findUserById(userId).bio }}
            </p>
            <v-btn
              text
              color="#1976d2"
              @click="editBioInput"
              v-if="editBiobtn"
              v-show="findUserById(userId)._id == getCurrentUser._id"
              >edit</v-btn
            >
          </div>

          <v-btn
            v-else-if="
              !doesTheUserHasBio &&
              !showBioInput &&
              findUserById(userId)._id == getCurrentUser._id
            "
            text
            color="#1976d2"
            @click="viewBioInput"
          >
            add bio
          </v-btn>
          <div v-if="showBioInput">
            <basic-input v-model="bioInputValue"></basic-input>
            <v-btn text @click="disViewBioInput"> cancel </v-btn>
            <v-btn text :disabled="!bioInputValue" @click="addBio">
              save
            </v-btn>
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text @click="start=false">
          <router-link :to="{name:'posts', params:{userId}}"> Posts </router-link>
        </v-btn>
        <v-btn text @click="start=false">
          <router-link :to="{name:'about', params:{userId}}"> About</router-link>
        </v-btn>
        <v-btn text @click="start=false">
          <router-link :to="{name:'friends', params:{userId}}"> Friends</router-link>
        </v-btn>
        <v-btn text @click="start=false">
          <router-link :to="{name:'photos', params:{userId}}"> photos</router-link>
        </v-btn>
        <v-spacer></v-spacer>

        <v-menu bottom left v-if="areUfriendsWithThisUser">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" color="#1976d2">
              friends
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="unfriend">
              <v-list-item-icon class="mr-0">
                <v-icon v-text="'mdi-account'"></v-icon>
              </v-list-item-icon>
              <v-list-item-title>unfriend</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          text
          outlined
          color="#1976d2"
          class="pl-0"
          small
          v-else-if="doUSendHimAFriendRequest"
          @click="cancelrequest"
        >
          cancel request
        </v-btn>

        <div v-else-if="didHeSendUAFriedRequest">
          <v-btn
            text
            outlined
            color="#1976d2"
            class="mr-3"
            small
            @click="confirmrequest"
          >
            confirm request
          </v-btn>
          <v-btn text outlined color="#1976d2" small @click="denyrequest">
            deny request
          </v-btn>
        </div>

        <v-btn
          text
          outlined
          color="#1976d2"
          class="pl-0"
          small
          v-else-if="areUThisUser"
        >
          <profile-picture mdi="mdi-pencil"></profile-picture>
          edit profile
        </v-btn>

        <v-btn
          text
          outlined
          color="#1976d2"
          class="pl-0"
          @click="addfriend"
          small
          v-else
        >
          <v-icon>mdi-plus</v-icon>
          add friend
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>

      <user-people-you-may-know :userId="userId" class="mt-3" />
      <v-row>
        <v-col cols="3" style="max-width: 100%">
          <v-row>
            <user-intro />
          </v-row>
          <v-row>
            <user-friends class="mt-4" :userId="userId" />
          </v-row>
          <v-row>
            <user-photos :userId="userId" class="mt-4" />
          </v-row>
        </v-col>
        <v-col cols="7" class="ml-3">
           <user-posts :userId="userId" v-if="start"/>
          <router-view/>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import basicInput from "../../components/textinputs/basicInput.vue";
import profilepicture from "../../components/user/profilePicture.vue";
import coverPhoto from "../../components/user/coverPhoto.vue";

import intro from "../../components/user/intro.vue";
import friends from "../../components/user/friends.vue";
import photos from "../../components/user/photos.vue";
import posts from "../../components/user/posts.vue";
import pplumaynow from "../../components/user/poepleYouMayKnow.vue";

import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  props: ["userId"],
  name:"app-user",
  data() {
    return {
      showBioInput: false,
      showBioValue: true,
      showAddBioBtn: true,
      bioInputValue: null,
      editBiobtn: true,
      start: true,
    };
  },
  components: {
    "basic-input": basicInput,
    "profile-picture": profilepicture,
    "cover-photo": coverPhoto,
    "user-intro": intro,
    "user-friends": friends,
    "user-posts": posts,
    "user-photos": photos,
    "user-people-you-may-know": pplumaynow,
  },
  computed: {
    ...mapGetters({
      findUserById: "user/findUserById",
      getCurrentUser: "user/getCurrentUser",
      getUsers: "user/getUsers",
    }),
    viewname(){
      return this.namedView
    },
    doesTheUserHasBio() {
      return this.findUserById(this.userId).bio ? true : false;
    },

    areUfriendsWithThisUser() {
      return !!this.getCurrentUser.friends.find(
        (friend) => friend.userId == this.userId
      );
    },
    doUSendHimAFriendRequest() {
      return !!this.findUserById(this.userId).friendRequiests.find(
        (friend) => friend.userId == this.getCurrentUser._id
      );
    },
    didHeSendUAFriedRequest() {
      return !!this.getCurrentUser.friendRequiests.find(
        (friend) => friend.userId == this.userId
      );
    },
    areUThisUser() {
      return this.userId == this.getCurrentUser._id;
    },
  },
  methods: {
    ...mapActions({
      addFriend: "user/addFriend",
      confirmFriendRequest: "user/confirmFriendRequest",
      cancelRequest: "user/cancelRequest",
      denyFriendRequest: "user/denyFriendRequest",
      unFriend: "user/unFriend",
    }),
    viewBioInput() {
      this.showAddBioBtn = false;
      this.showBioInput = true;
    },
    disViewBioInput() {
      this.bioInputValue = null;
      this.showBioInput = false;
      (this.showBioValue = true), (this.showAddBioBtn = true);
      this.editBiobtn = true;
    },
    editBioInput() {
      this.bioInputValue = this.getCurrentUser.bio || "";
      this.editBiobtn = false;
      (this.showBioValue = false), (this.showBioInput = true);
    },
    addBio() {
      const url = `http://localhost:3000/settings/addbio/${this.getCurrentUser._id}`;
      const body = {
        bio: this.bioInputValue,
      };
      axios
        .post(url, body)
        .then((response) => {
          console.log(response.data);
          this.$store.commit("user/SET_CURRENT_USER", response.data);
          this.bioInputValue = null;
          this.showBioInput = false;
          (this.showBioValue = true), (this.showAddBioBtn = true);
          this.editBiobtn = true;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    addfriend() {
      const request = {
        requesterId: this.getCurrentUser._id,
        requesteeId: this.userId,
      };
      this.addFriend(request);
    },
    cancelrequest() {
      const request = {
        requesterId: this.getCurrentUser._id,
        requesteeId: this.userId,
      };
      this.cancelRequest(request);
    },
    confirmrequest() {
      const request = {
        confirmerId: this.getCurrentUser._id,
        confirmeeId: this.userId,
      };
      this.confirmFriendRequest(request);
    },
    denyrequest() {
      const deny = {
        denyerId: this.getCurrentUser._id,
        denyeeId: this.userId,
      };
      this.denyFriendRequest(deny);
    },
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

<style scoped>
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 0;
}
.v-card__subtitle {
  padding-left: 50%;
}
.v-card__text {
  margin-bottom: 20px;
}
a {
  text-decoration: none;
}
</style>