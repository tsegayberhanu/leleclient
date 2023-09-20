<template>
    <div>
        <v-list-item>
            <vilist-item-content>
                <v-list-item-avatar>
                    <img :src="getCurrentUser.avaterUrl" alt="getCurrentUser.username">
                </v-list-item-avatar>
                <v-list-item-avatar>
                    <img :src="getCurrentUser.coverPhotoUrl" alt="getCurrentUser.username">
                </v-list-item-avatar>
            </vilist-item-content>
        </v-list-item>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters({
            getCurrentUser:"user/getCurrentUser"
        })
    }
}
</script>