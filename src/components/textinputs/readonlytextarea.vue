<template>
  <div>
    <v-list-item-content>
      <v-list-item-title>
        <v-textarea
          auto-grow
          rows="1"
          :readonly="!write"
          :value="checking"
          hide-details
          filled
          rounded
          @click:append="write=!write"
        >
          <template #prepend-inner>
            <a href="#">username</a>
          </template>
          <template #append>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-icon color="primary" dark v-on="on">mdi-pen</v-icon>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">PostID</span>
                  <span class="headline">UserId</span>
                  <span class="headline">commentId</span>
                </v-card-title>
                <v-card-text>
                  <edit-comment v-model="checking"/>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-textarea>
      </v-list-item-title>
      <v-list-item-subtitle class="ml-6">
        <v-card-actions class="ldrd mt-1">
          <div class="like">
            <v-btn icon text>
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <div class="mt-3 pl-2 likes">
              <p>14</p>
            </div>
          </div>
          <div class="deslike ml-3">
            <v-btn icon text>
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
            <div class="mt-3 pl-2 deslikes">
              <p>12</p>
            </div>
          </div>
          <div class="replay ml-3">
            <v-btn text @click="replay=!replay">
              <v-icon>mdi-replay</v-icon>
              <span>replay</span>
            </v-btn>
          </div>
          <div class="createdAt ml-2">
            <a href="#">3/4/2020 1:48 AM</a>
          </div>
        </v-card-actions>
      </v-list-item-subtitle>
      <app-comment :postId="commentId" v-if="replay" />
      <div class="commentreplays">
        <slot></slot>
        <slot name="commentReplays" :more="more"></slot>
      </div>
    </v-list-item-content>
  </div>
</template>
<script>
import appComment from "../views/post/appComment";
import editComment from '../../comments/writeMessage'
export default {
  props: {
    comment: {
      type: Object
    }
  },
  data() {
    return {
      replay: false,
      write: false,
      read: false,
      more: false,
      dialog: false,
      checking:'Checking the connection Checking the proxy'
    };
  },
  components: {
    appComment,
    editComment
  },
  methods:{
    save(){
      alert(this.checking)
      this.dialog = false
    }
  }
};
</script>
<style scoped>
.v-card__actions {
  padding: 0;
}
.like,
.deslike {
  display: flex;
}
a {
  text-decoration: none;
}
.v-list-item__content {
  padding: 0;
}
</style>