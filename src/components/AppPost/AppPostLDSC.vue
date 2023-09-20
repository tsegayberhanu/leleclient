<template>
  <div>
    <v-card-actions>
      <div class="LDS">
        <div class="like">
          <v-btn text icon @click="LDS(postlds.postId, 'like')">
            <v-icon>mdi-thumb-up</v-icon>
          </v-btn>
          <lds-tool-tip :data="postlds.likes" ></lds-tool-tip>
        </div>
        <div class="deslike">
          <v-btn
            text
            depressed
            icon
            light
            tile
            @click="LDS(postlds.postId, 'deslike')"
          >
            <v-icon>mdi-thumb-down</v-icon>
          </v-btn>
          <lds-tool-tip :data="postlds.deslikes" ></lds-tool-tip>

        </div>
        <div class="share">
          <v-btn
            text
            depressed
            icon
            light
            tile
            @click="LDS(postlds.postId, 'share')"
          >
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
          <lds-tool-tip :data="postlds.shares" ></lds-tool-tip>

        </div>
      </div>
    </v-card-actions>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ldstooltip from "./ldstooltip.vue";
export default {
  props: {
    postlds: {
      postId: null,
      likes: [],
      deslikes: [],
      shares: [],
    },
  },

  computed: {
    ...mapGetters({
      getCurrentUser: "user/getCurrentUser",
      findUserById: "user/findUserById",
    }),
  },
components:{
'lds-tool-tip':ldstooltip
},
  methods: {
    //Like Deslike Share
    LDS(id, action) {
      let vim = this;
      this.getCurrentUser
        ? true
        : (this.getCurrentUser = JSON.parse(
            localStorage.getItem("currentUser")
          ));
      const payload = {
        userId: this.getCurrentUser._id,
        postId: id,
        field: action,
      };
      this.$store.dispatch("LDS", payload).then(() => {});
    },
  },
};
</script>
<style scoped>
.LDS {
  display: flex;
  flex-direction: row;
}
.LDS div {
  padding-left: 14px;
}
</style>