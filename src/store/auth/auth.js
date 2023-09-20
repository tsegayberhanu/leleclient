import axios from 'axios'
export default {
    namespaced: true,
    state: {
        currentUser: undefined
    },
    getters: {
        IsUsersignedIn(state) {
            return !!state.curentUser
          },
          getCurrentUser(state) {
            return state.curentUser
          }
    },
    mutations: {

    },
    actions: {
        signIn(state, payload) {
            axios.post(payload.url, payload.data).then(
                response => {
                    if (response.data.error) {
                        return { error: error.message }
                    } else {
                        state.currentUser = response.data
                    }
                }
            ).catch(
                error => error.message
            )
        }

    }
}