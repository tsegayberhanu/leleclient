<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item>
        <router-link
          :to="{ name: 'user', params: { userId: getCurrentUser._id, username: getCurrentUser.username } }"
        >
          <v-list-item-avatar size="48">
            <img :src="getCurrentUser.avaterUrl" />
          </v-list-item-avatar>
        </router-link>
        <v-list-item-content>
          <v-list-item-subtitle>
            <v-textarea
              v-model="post_data"
              v-bind="attrs"
              v-on="on"
              auto-grow
              rows="1"
              outlined
              dense
              rounded
              filled
              flat
              solo
              hide-details
              :placeholder="whatIsOnYourMind"
            ></v-textarea>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </template>
    <v-card>
      <v-card-title>
        <v-row justify="center">
          <span class="font-weight-regular">create post</span>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>
        <v-list-item>
          <router-link
            :to="{ name: 'user', params: { userId: getCurrentUser._id, username: getCurrentUser.username } }"
          >
            <v-list-item-avatar>
              <img :src="getCurrentUser.avaterUrl" />
            </v-list-item-avatar>
          </router-link>
          <v-list-item-content class="pb-0">
            <v-list-item-title>
              <router-link
                :to="{ name: 'user', params: { userId: getCurrentUser._id, username: getCurrentUser.username } }"
                style="text-decoration: none"
                >{{ getCurrentUser.username }}</router-link
              >
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-select
                v-model="who_can_see_it"
                :items="items"
                label="Who can see my post"
              ></v-select>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-subtitle>
      <v-card-text style="padding-left: 90px">
        <v-form ref="form">
          <basic-input focus v-model="post_data" class="mb-6" />

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="post"> post </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import basicInput from "../components/textinputs/basicInput";
export default {
  data() {
    return {
      dialog: false,
      items: [`public`, "friends", "onlyme"],
      who_can_see_it: "Public",
      post_data: undefined,
    };
  },
  computed: {
    ...mapGetters({
      getCurrentUser: "user/getCurrentUser",
    }),
    whatIsOnYourMind() {
      return `what is on your mind ${this.getCurrentUser.username}?`;
    },
  },
  components: {
    "basic-input": basicInput,
  },
  methods: {
    ...mapActions(["postThought"]),
    goto() {
      this.$route.push({
        name: "user",
        params: { userId: this.getCurrentUser._id, username: this.getCurrentUser.username },
      });
    },
    post() {
      const user = this.getCurrentUser;
      const post = {
        authorId: user._id,
        postType: "defualt",
        whoCanSeeIt:this.who_can_see_it,
        content: this.post_data,
      };
      this.postThought(post)
        .then(() => {
          this.$refs.form.reset();
          (this.post_data = undefined), (this.dialog = false);
        })
        .catch((err) => {});
    },
    closeDialog() {
      this.$refs.form.reset();
      (this.post_data = undefined), (this.dialog = false);
    },
  },
};
</script>
<style scoped>
.v-dialog > .v-card > .v-card__subtitle {
  padding: 0 24px 10px 0;
}
.avater :hover {
  cursor: pointer;
}
.v-dialog > .v-card > .v-card__subtitle[data-v-229ee358] {
  padding: 0 24px 0 0;
}
</style>