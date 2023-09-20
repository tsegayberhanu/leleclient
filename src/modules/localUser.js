import { mapGetters } from "vuex"
export default {
    isThereCurrentUser : !!JSON.parse(localStorage.getItem('currentUser')),
    computed:{
        ...mapGetters({
            getCurrentUser:'user/getCurrentUser',
            gethope:'user/sethope'
        })
    },
    cons(){
        console.log(this.computed)
    }
}