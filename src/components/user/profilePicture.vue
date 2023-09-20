<template>
  <v-dialog v-model="dialog" persistent max-width="50%">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on">{{ mdi }}</v-icon>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5" style="margin-left: 40%">
          Choose Profile Picture</span
        >
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-file-input
            v-model="file"
            accept="image/png, image/jpeg, image/bmp"
            dense
            outlined
            light
            flat
            prepend-icon="mdi-camera"
            @change="onFileChange"
            :rules="rules"
            placeholder="choose image"
          >
            <template v-slot:append>
              <div></div>
            </template>
            <template v-slot:selection>
              <v-img
                v-if="imagePreviewURL"
                :src="imagePreviewURL"
                max-height="300"
                max-width="400"
                contain
              ></v-img>
            </template>
          </v-file-input>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="fileupload" v-if="file">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  props: ["mdi"],
  data() {
    return {
      file: null,
      dialog: false,
      imagePreviewURL: null,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "profile picture size should be less than 2 MB!",
      ],
    };
  },
  computed: {
    ...mapGetters({
      getCurrentUser: "user/getCurrentUser",
    }),
  },
  methods: {
    onFileChange(payload) {
      const file = payload; // in case vuetify file input

      const type = `.${file.name.split(".")[1]}`;
      Object.defineProperty(file, "name", {
        value: Date.now() + type,
        writable: false,
      });
      if (file) {
        this.imagePreviewURL = URL.createObjectURL(file);
        URL.revokeObjectURL(file); // free memory
      } else {
        this.imagePreviewURL = null;
      }
    },
    fileupload() {
      if (!!this.file && !!this.imagePreviewURL) {
        const formData = new FormData();
        formData.append("avater", this.file);
       const url = `http://localhost:3000/uploadavater/${this.getCurrentUser._id}`;
        axios
          .post(url, formData)
          .then((res) => {
            this.$store.commit("user/SET_CURRENT_USER", res.data);
            this.file = null;
            this.imagePreviewURL = null;
            this.dialog = false;
          })
          .catch((err) => {
            this.file = null;
            this.imagePreviewURL = null;
            this.dialog = false;
            console.log(err.message);
          });
      } else {
        alert("first you must select file");
      }
    },
  },
};
</script>