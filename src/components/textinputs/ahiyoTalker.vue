<template>
  <div class="talker">
    <v-row>
      <v-col sm="9">
        <v-textarea
          ref="ta"
          auto-grow
          rows="1"
          outlined
          dense
          rounded
          filled
          append-icon="mdi-comment"
          @input="handleInput"
          v-model="content"
          prepend-icon="mdi-microphone"
          @click:append="emoji=true"
         :rules="[v => !!v || 'feild is required',v=>(v.length>4)||'feild must be valid']"
        ></v-textarea>
        <v-row no-gutters>
          <v-col cols="8" sm="6"></v-col>
          <v-col cols="4" sm="6">
            <v-dialog v-model="emoji" max-width="250" hide-overlay >
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
  props: {
    value: {
      type: String
    }
  },
  components: {
    "v-emoji-picker": VEmojiPicker
  },
  data() {
    return {
      content: this.value,
      emoji: false,
      textA:null
    };
  },
  methods: {
    handleInput(e) {      
      this.$emit("input", this.content);     
    },
    onEmoji() {
      this.emoji = true;
    },
    selectEmoji(emoji) {
      this.content+=emoji.data
      this.$emit("input", this.content);
    },
    ofEmoji() {
      this.emoji = false;
    }
  },
  computed: {
    source() {
      return this.src;
    }
  }
};
</script>
<style scoped>

.talker {
  display: flex;
  flex-direction: row;
  height: auto;
  width: inherit;
}
.v-avatar {
  margin-right: 8px;
}
.col-sm-9,.col{
  padding:0;
  
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
    margin-bottom: 18px;
}
</style>