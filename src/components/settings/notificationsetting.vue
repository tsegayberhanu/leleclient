<template>
  <div>
    <v-card-title>
      <v-list-item-icon>
        <v-icon v-text="'mdi-lock'"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="'System Notification'"></v-list-item-title>
      </v-list-item-content>
    </v-card-title>
    <v-card-subtitle>
        <p>notify me when</p>
    </v-card-subtitle>
    <v-card-text>
      <v-checkbox
        label="Someone liked my post"
        color="primary"
        value="primary"
        hide-details
      ></v-checkbox>
      <v-checkbox
        label="Someone commented on my post"
        color="primary"
        value="primary"
        hide-details
      ></v-checkbox>

      <v-checkbox
        label="Someone shared my post"
        color="primary"
        value="primary"
        hide-details
      ></v-checkbox> 
      <v-checkbox
        label="Someone sent me/accepted my friend requset"
        color="primary"
        value="primary"
        hide-details
      ></v-checkbox>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined right> save changes </v-btn>
    </v-card-actions>
  </div>
</template>
<script>
export default {
  props: ["userId"],
};
</script>