<template>
    <v-row>
      <v-avatar size="48">
        <img :src="getCurrentUser.avaterUrl" />
      </v-avatar>
      <v-col sm="9">
        <v-textarea
          :autofocus="focus"
          auto-grow
          rows="1"
          outlined
          dense
          rounded
          filled
          hide-details
          placeholder="write comment"
          append-icon="mdi-send"
          @input="handleInput"
          v-model="content"
          prepend-inner-icon="mdi-face"
          @click:append="writeComment"
          @click:prepend-inner="emoji = true"
          :rules="[
            (v) => !!v || 'feild is required',
            (v) => v.length > 0 || 'feild must be valid',
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
</template>
<script>
import VEmojiPicker from "v-emoji-picker";
import { mapGetters } from "vuex";
export default {
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
  computed: {
    ...mapGetters({
      getCurrentUser: "user/getCurrentUser",
    }),
  },
  methods: {
    writeComment() {
        
      const vm = this;
      const authorId = this.getCurrentUser._id;
      const commentTo = this.postId;
      const comment = this.content;

      const payload = {
        authorId,
        commentTo,
        comment,
      };

      console.log(payload);

      this.$store
        .dispatch("writeComment", payload)
        .then(() => {
          vm.content = "";
          vm.$emit("update", false);
        })
        .catch((err) => {
          console.log(err.message);
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