<template>
  <v-card flat tile>
    <v-card-subtitle>what do you have on ahiyo</v-card-subtitle>
    <v-form ref="form" v-model="valid">
      <v-card-text>
        <ahiyo-talker v-model="ahiyo1" />
        <ahiyo-reciever />
        <ahiyo-talker v-model="ahiyo2" />
        <ahiyo-reciever />
        <ahiyo-talker v-model="ahiyo3" />
        <ahiyo-reciever />
        <ahiyo-talker v-model="ahiyo4" />
        <ahiyo-talker v-model="ahmm" class="last" />
      </v-card-text>
      <v-card-actions>
        
        <v-btn :disabled="!valid" @click="post" block rounded>post</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
import ahiyoTalker from "../components/textinputs/ahiyoTalker";
import ahiyoReciever from "../components/textinputs/ahiyoReciever";
import axios from "axios";
export default {
  components: {
    "ahiyo-talker": ahiyoTalker,
    "ahiyo-reciever": ahiyoReciever
  },
  data() {
    return {
      ahiyo1: "",
      ahiyo2: "",
      ahiyo3: "",
      ahiyo4: "",
      ahmm: "",
      valid: false,
      echo: "ኣህዮ",
      hello: false
    };
  },
  methods: {
    post() {
      const authorid=localStorage.getItem("user-id");
      console.log(authorid)
      const post = 
        {
          postType: "ahiyo",
          authorId:authorid,
          content: {
            talkerContent: [
              this.ahiyo1,
              this.ahiyo2,
              this.ahiyo3,
              this.ahiyo4
            ],
            recieverContent: [this.echo,this.echo,this.echo,this.ahmm]
          }
        }      
      const vm = this;
      const url = "http://localhost:3000/post/ahiyo";
      axios
        .post(url,post)
        .then(function(response) {
          console.log(response.data)
         // vm.$router.push("/signin");          
        })
        .catch(function(error) {
          console.log(error.message);
        });
      console.log(post)
    }
  }
};
</script>
<style scoped>
.v-card__text {
  padding-bottom: 0;
}

.v-card {
  margin: 0 auto;
  width: 500px;
}
.last {
  margin-left: 40px;
}
</style>