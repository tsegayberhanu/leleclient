import axios from 'axios'

const cuser = JSON.parse(localStorage.getItem('currentUser'))

if (!!cuser) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${cuser.token}`;
}
axios.defaults.baseURL = "http://localhost:3000"

const user = {
  namespaced: true,
  state: {
    users: [],
    curentUser: undefined
  },

  getters: {
    findUserById: (state) => (id) => {
      let user = state.users.find(user => user._id == id)
      return user
    },
    getCurrentUser(state) {
      let user = undefined
      if (!state.curentUser) {
        let use = JSON.parse(localStorage.getItem('currentUser'))
        user = state.users.find(user => user._id == use._id)
        state.curentUser = user
      }
      return state.curentUser
    },
    getUsers(state) {
      return state.users
    },
    getFriendsOfAUser: (state) => (userId) => {
      let friendsList = []
      let friends = state.users.find(user => user._id == userId).friends
      friends.forEach(element => {
        friendsList.push(state.users.find(user => user._id == element.userId))
      });
      return friendsList
    }
  },
  mutations: {

    SET_CURRENT_USER(state, data) {
      state.curentUser = data
    },
    SET_USERS(state, data) {
      state.users = data
    },
    UPDATE_USER_FRIEND_REQUESTS(state, payload) {
      state.users.find(user => user._id == payload.userId).friendRequiests = payload.friendRequiests
      state.users.find(user => user._id == payload.userId).notifications = payload.notifications
    },
    UPDATE_USER_FRIENDS(state, payload) {
      state.users.find(user => user._id == payload.userId).friends = payload.friends
    }
  },
  actions: {

    setCurrentUser({ commit }, data) {
      commit('SET_CURRENT_USER', data)
    },

    async loadUsers({ commit }) {
      try {
        let res = await axios.get('/users')
        if(res.data) {
          commit('SET_USERS', res.data)
        }
      } catch (error) {
         console.log(error.message)
      }
    },

    changeUserNameOrEmail({ commit }, payload) {
      const url = `/settings/account/${payload.id}`;
      axios
        .post(url, payload.data)
        .then((response) => {
          commit('SET_CURRENT_USER', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getCurrentUserById({ commit }) {
      const user = JSON.parse(localStorage.getItem('currentUser'))
      axios
        .get(`/users/${user._id}`)
        .then(response => {
          console.log(response.data)
          commit('SET_CURRENT_USER', response.data)
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    addFriend({ commit }, payload) {
      const url = `/users/requestfriendship`
      axios.post(url, payload).then(response => {
        commit('UPDATE_USER_FRIEND_REQUESTS', response.data)
      }).catch(err => {
        console.log(err.message)
      })
    },
    cancelRequest({ commit }, payload) {
      const url = `/users/cancelrequest`
      axios.post(url, payload).then(response => {
        commit('UPDATE_USER_FRIEND_REQUESTS', response.data)
      }).catch(err => {
        console.log(err.message)
      })
    },
    confirmFriendRequest({ commit }, payload) {
      const url = `/users/confirmfriendrequest`
      axios.post(url, payload).then(response => {
        commit('UPDATE_USER_FRIENDS', response.data)
        commit('UPDATE_USER_FRIEND_REQUESTS', response.data)

      }).catch(err => {
        console.log(err.message)
      })
    },
    denyFriendRequest({ commit }, payload) {
      const url = `/users/denyfriendrequest`
      axios.post(url, payload).then(response => {
        commit('UPDATE_USER_FRIEND_REQUESTS', response.data)
      }).catch(err => {
        console.log(err.message)
      })
    },
    unFriend({ commit }, payload) {
      const url = `/users/unfriend`
      axios.post(url, payload).then(response => {
        commit('UPDATE_USER_FRIENDS', response.data)
      }).catch(err => {
        console.log(err.message)
      })
    }
  }
}

export default user