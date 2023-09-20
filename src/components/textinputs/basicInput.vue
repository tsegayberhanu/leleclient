<template>
  <div class="basic-input">
    <v-row>
      <v-col sm="9">
        <v-textarea
          :autofocus="focus"
          ref="ta"
          auto-grow
          rows="1"
          outlined
          dense
          rounded
          filled
          hide-details
          append-icon="mdi-face"
          @input="handleInput"
          v-model="content"
          @click:append="emoji = true"
          :rules="[
            (v) => !!v || 'feild is required',
          ]"
        ></v-textarea>
        <v-row no-gutters>
          <v-col cols="8" sm="6"></v-col>
          <v-col cols="4" sm="6">
            <v-dialog v-model="emoji" max-width="250" hide-overlay>
              <v-emoji-picker @select="selectEmoji" v-if="emoji" />
            </v-dialog>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import VEmojiPicker from "v-emoji-picker";
export default {
  name: "basic-input",
  props: {
    value: {
      type: String,
      default: "",
    },
    focus: {
      type: Boolean,
      default: false,
    },
    postId: "",
  },
  components: {
    "v-emoji-picker": VEmojiPicker,
  },
  data() {
    return {
      content: this.value,
      emoji: false,
      textA: null,
    };
  },
  methods: {
    writeComment(postid) {
      const vm = this;
      const comment = this.content;
      const authorId = localStorage.getItem("user-id");
      const payload = {
        userId: authorId,
        postId: postid,
        comment: comment,
      };
      this.$store
        .dispatch("writeComment", payload)
        .then(() => {
          vm.content = "";
          vm.$emit("update", false);
        })
        .then(() => {
          vm.$store.dispatch("loadPosts");
        })
        .then(() => {
          alert("hello from comment writer");
          console.log(this.$refs.ta);
        });
    },
    handleInput(e) {
      this.$emit("input", this.content);
    },
    onEmoji() {
      this.emoji = true;
    },
    selectEmoji(emoji) {
      this.content += emoji.data;
      this.$emit("input", this.content);
    },
    ofEmoji() {
      this.emoji = false;
    },
  },
};
</script>
<style scoped>
.መንቀሒ {
  display: flex;
  flex-direction: row;
  height: auto;
  width: inherit;
}
.v-avatar {
  margin-right: 8px;
}
.col-sm-9,
.col {
  padding: 0;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 18px;
}
</style>