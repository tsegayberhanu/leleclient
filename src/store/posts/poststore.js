import axios from 'axios'
const user = JSON.parse(localStorage.getItem('currentUser'))
if(!!user){
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${user.token}`;
}
axios.defaults.baseURL ="http://localhost:3000"

export default {
  state: {

    replyas: [
      {
        commentId: '123wertyu',
        commentTo: '2345jui',
        commentAuthor: 'user',
        commentPublicationDate: '12-12-2019',
        commentContent: 'hello',
      }
    ],
    isReadOnly: true,
    posts: [],
  },
  getters: {
    isReadOnly(state) {
      return state.isReadOnly
    },
    findPostsByAuthor: (state) => (author) => {

      const posts = state.posts.filter(post => post.authorId == author.authorId)
      return posts
    },

    findPostById: (state) => (id) => {
      let post = state.posts.find(post => post._id == id)
      return post
    },

    getPosts(state) {
      return state.posts
    }

  },

  mutations: {
    SET_ISREADONLY(state, bool) {
      state.isReadOnly = bool
    },
    SET_POSTS(state, posts) {
      state.posts = posts
    },
    ADD_POST(state, post) {
      (state.posts).unshift(post)
    },
    EdIT_POST(state, post) {
      state.posts.find(pos => pos._id == post._id).content = post.content

    },
    DELETE_POST(state, postId) {
      const index = state.posts.findIndex(post => post._id == postId)
      state.posts.splice(index, 1)
    },
    ADD_REPLAY(state, pos) {
      state.posts.find(post => post._id == pos._id).comments = pos.comments
    },
    EDIT_REPLAY(state, pos) { 
      state.posts.find(post => post._id == pos._id).comments = pos.comments
    },
    
    ADD_COMMENT(state, comment) {
      state.posts.find(post => post._id == comment.commentedTo).comments.unshift(comment)
    },
    DELETE_COMMENT(state, comment) {
      state.posts.find(post => post._id == comment.commentedTo).comments.splice(comment.commentIndex, 1)
    },
    LIKE_TO_COMMENT(state, post) {
      const t = (state.posts.find(p => p._id == post._id).comments = post.comments)
    }
  },

  actions: {

    loadPosts({ commit }) {
      axios
        .get('/post/ahiyos')
        .then(response => {
          commit('SET_POSTS', response.data)
          return response.data
        })
        .catch(err => err.message)
    },
// like, deslike, share
    LDS({ state, dispatch }, payload) {
      let url = undefined
      const post = state.posts.find(p => p._id == payload.postId)


      const f = post[`${payload.field}s`]
      const check = f.some(x => x.userId == payload.userId)
      const field = `${payload.field}s`
      if (check) {
        url = `/post/ahiyo/unLDS/${payload.postId}`
      } else {
        url = `/post/ahiyo/LDS/${payload.postId}`
      }
      axios.post(url, { userId: payload.userId, field: field }).then(() => {
        dispatch('loadPosts')
      }).catch(err => {
      })
    },

    writeComment({ commit }, payload) {
      const url = `/post/defualt/writecomment/${payload.params}`
      axios.post(url, payload.data).then((response) => {
        commit('ADD_COMMENT', response.data)
      }).catch(err => err.message)
    },

    editComment({ }, payload) {
      const url = `/post/editcomment`
      axios.post(url, payload).then((response) => {
        console.log(response.data)
      }).catch(err => err.message)
    },

    deleteComment({ commit }, payload) {
      const url = `/post/deletecomment`
      axios.post(url, payload).then((response) => {
        commit('DELETE_COMMENT', { commentedTo: payload.postId, commentIndex: response.data.index })
      }).catch(err => err.message)
    },

    writeReplay({ commit }, payload) {
      const url = `/post/defualt/writereplay/${payload.postId}`
      axios.post(url, payload.body).then((response) => {

        commit('ADD_REPLAY', response.data)

        // console.log(response.data)
      }).catch(err => err.message)
    },

    editReplay({ commit }, replay) {
      const url = `/post/editreplay/${replay.postId}/${replay.commentId}`
      axios
        .post(url, { replayId: replay.replayId, content: replay.content })
        .then(res => {
          if (res.data.error) {
            console.log(res.data.error)
          } else {
            commit('EDIT_REPLAY', res.data)
          }
        })
    },

    deleteReplay({ commit }, replay) {
      const url = `/post/deletereplay/${replay.postId}/${replay.commentId}`
      axios
        .post(url, { replayId: replay.replayId})
        .then(res => {
          if (res.data.error) {
            console.log(res.data.error)
          } else {
            console.log(res.data)
            commit('EDIT_REPLAY', res.data)
          }
        })
    },

    likeToComment({ commit }, body) {
      const url = `/post/defualt/likecomment/${body.postId}/${body.commentId}`
      axios.post(url, { userId: body.userId }).then(res => {
        if (!!res.data.error) {
          console.log(res.data)
        } else {
          commit('LIKE_TO_COMMENT', res.data)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    postThought({ commit }, payload) {
      const url = `/post`;
      axios
        .post(url, payload)
        .then((response) => {
          commit("ADD_POST", response.data);
        })
        .catch((err) => {
          console.log(err.message)
        });

    },
    async editPost({ commit }, paylod) {
      return new Promise((resolve, reject) => {
        const url = `/post/edit/${paylod.postId}`;
        axios.post(url, paylod.body).then((res) => {
          commit('EdIT_POST', res.data)
          resolve()
        })
      })
    },
    deletePost({ commit }, post) {
      const url = `/post/delete/${post.postId}`;
      axios
        .post(url)
        .then(() => {
          commit('DELETE_POST', post.postId)
        })
        .catch((err) => {
          console.log(err.message)
        });
    }
  },
}