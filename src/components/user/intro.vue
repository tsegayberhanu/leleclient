<template>
  <v-card outlined>
    <v-card-title>
      <router-link to="">
          intro 
      </router-link>
     </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="item in intro" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      intro: [
        {
          icon: "mdi-home",
          title: "from mekelle",
        },
        {
          icon: "mdi-clock",
          title: "joined in 2013",
        },
        {
          icon: "mdi-school",
          title: "studied at Mekelle Institute Of Technology",
        },
        {
          icon: "mdi-wifi",
          title: "follwed by 30 people",
        },
      ],
    };
  },
};
</script>