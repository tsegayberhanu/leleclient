<template>
  <span>
    <v-tooltip top v-if="data.length > 0">
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">{{ data.length }}</span>
      </template>
      <span>
        <v-list dark>
          <v-list-item
            v-for="item of data"
            :key="item.userId"
            :to="{ name: 'user', params: { userId: item.userId } }"
          >
            <a>
              {{ findUserById(item.userId).username }}
            </a>
          </v-list-item>
        </v-list>
      </span>
    </v-tooltip>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["data"],
  computed: {
    ...mapGetters({
      findUserById: "user/findUserById",
    }),
  },
};
</script>