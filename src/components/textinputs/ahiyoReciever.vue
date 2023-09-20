<template>
  <div class="reciever">
    <v-checkbox
      :rules="[v => !!v || 'You must sound ahiyo to continue!']"
      label="Ahiyo"
      required
      off-icon="mdi-microphone-off"
      on-icon="mdi-microphone"
    ></v-checkbox>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.reciever {
  margin-left: 7%;
  margin-top: -12px;
}
.v-input--selection-controls {
    margin-top:0;
    padding-top:0;
}
</style>