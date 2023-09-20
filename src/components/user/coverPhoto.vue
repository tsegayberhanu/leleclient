<template>
  <v-dialog v-model="dialog" persistent max-width="50%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn tile v-bind="attrs" v-on="on">
        <v-icon>mdi-camera</v-icon>
        add cover photo
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5" style="margin-left: 40%">
          Choose Cover Pohoto</span
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
import axios from "axios";
import { mapGetters } from "vuex";
export default {
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
      const file = payload;
      Object.defineProperty(file, "name", {
        value: Date.now() + file.name,
        writable: false,
      });
      if (file) {
        this.imagePreviewURL = URL.createObjectURL(file);
        URL.revokeObjectURL(file);
      } else {
        this.imagePreviewURL = null;
      }
    },
    fileupload() {
      if (!!this.file && !!this.imagePreviewURL) {
        const formData = new FormData();
        formData.append("coverphoto", this.file);

        const url = `http://localhost:3000/uploadcoverphoto/${this.getCurrentUser._id}`;
        axios
          .post(url, formData)
          .then((res) => {
            console.log(res.data);
            this.$store.commit("user/SET_CURRENT_USER", res.data);
            this.file = null;
            this.imagePreviewURL = null;
            this.dialog = false;
          })
          .catch((err) => {
            alert(err.message);
            this.file = null;
            this.imagePreviewURL = null;
            this.dialog = false;
          });
      } else {
        alert("first you must select file");
      }
    },
  },
};
</script>