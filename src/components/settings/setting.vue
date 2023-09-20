<template>
  <div>
    <app-header></app-header>
    <v-container>
      <v-row>
        <v-col cols="4 ">
          <v-card class="pa-2" tile shaped>
            <v-list nav dense>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  @click="toggle(i)"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item.icon" :color="item.color"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="8 ">
          <v-card tile shaped style="padding-bottom: 30px">
            <accountsetting v-show="settingComponents.accountS" :userId="userId" />
            <passwordsetting v-show="settingComponents.passwordS" :userId="userId" />
            <profilesetting v-show="settingComponents.profileS" :userId="userId" />
            <deletesetting v-show="settingComponents.deleteS" :userId="userId" />
            <notificationsetting v-show="settingComponents.notificationsS" :userId="userId" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <app-footer></app-footer>
  </div>
</template>
<script>
import accountsetting from "./accountsetting";
import passwordsetting from "./passwordsetting";
import profilesetting from "./profilesetting";
import deletesetting from "./deletesetting";
import notificationsetting from "./notificationsetting";

export default {
  data() {
    return {
      userId:undefined,
      settingComponents: {
        accountS: true,
        profileS: false,
        passwordS: false,
        notificationsS: false,
        deleteS: false,
      },

      selectedItem: 0,
      items: [
        { text: "Account Setting", icon: "mdi-settings", color: "" },
        { text: "Profile", icon: "mdi-account", color: "" },
        { text: "Change Password", icon: "mdi-lock", color: "" },
        { text: "Notifications", icon: "mdi-information", color: "" },
        { text: "Delete Account", icon: "mdi-delete", color: "red" },
      ],
    };
  },
  components: {
    accountsetting,
    passwordsetting,
    profilesetting,
    notificationsetting,
    deletesetting,
  },
  methods: {
    toggle(index) {
      for (let key of Object.keys(this.settingComponents)) {
        this.settingComponents[key] = false;
      }
      let key = Object.keys(this.settingComponents)[index];
      this.settingComponents[key] = true;
    },
  },
  
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("currentUser"))['_id']
    //console.log(this.userId)
  },
};
</script>
<style scoped>
</style>