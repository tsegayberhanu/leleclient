<template>
  <div class="content">
    <span v-if="!!postContent.talkerContent">
      <span v-for="(content, index) in postContent.talkerContent" :key="index">
        <div class="talker">
          <v-textarea
            auto-grow
            rows="1"
            readonly
            :placeholder="postContent.talkerContent[index]"
            dense
            flat
            solo
            hide-details
          />
        </div>
        <div class="reciever">
          <v-textarea
            auto-grow
            rows="1"
            readonly
            :placeholder="postContent.recieverContent[index]"
            prepend-inner-icon="mdi-microphone"
            dense
            flat
            solo
            success
            hide-details
          />
        </div>
      </span>
    </span>
    <span v-else>
      <v-textarea
        auto-grow
        rows="1"
        :readonly="readonly"
        v-model="content"
        dense
        flat
        hide-details
        solo
      >
        <template v-if="!readonly" #append>
          <v-btn text @click="setReadOnlyToTrue"> cancel </v-btn>
          <v-btn text success @click="saveChanges"> save</v-btn>
        </template>
      </v-textarea>
    </span>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["postContent", "postId", "readonly"],
  data() {
    return {
      content: undefined,
    };
  },

  computed: {
    ...mapGetters(["isReadOnly"]),
  },
  methods: {
    ...mapActions(["editPost"]),
    setReadOnlyToTrue() {
      this.$emit("setReadOnlyToTrue");
    },
    saveChanges() {
      const payload = {
        postId: this.postId,
        body: { content: this.content },
      };
      this.editPost(payload).then(() => {        
          this.setReadOnlyToTrue();       
      });
    },
  },
  mounted() {
    this.content = this.postContent;
  },
  watch: {
    readonly: function (newv, old) {
      if (newv && !old) {
        this.content = this.postContent;
      }
    },
  },
};
</script>
<style scoped>
.reciever {
  margin-left: 3%;
}
.content {
  margin-bottom: 20px;
}
</style>