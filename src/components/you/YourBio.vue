<template>
    <div>
        <v-list-item>
            <vilist-item-content>
                <v-list-item-title>
                    {{getCurrentUser.username}}
                </v-list-item-title>
                <v-list-item-title>
                    {{getCurrentUser.email}}
                </v-list-item-title>
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