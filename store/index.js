import Vuex from 'vuex';
import axios from "axios";

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            }
        },
        actions: {
            // Gets executed one time only on the server to have fast loading times
            // context is the payload that is always the same one you get in fetch and asyncData
            nuxtServerInit(vuexContext, context) {
                return axios.get('https://nuxt-blog-bee7d.firebaseio.com/posts.json')
                    .then(res => {
                        const postsArray = []
                        for (const key in res.data) {
                            // you can store the actual id by pushing a new object
                            // where we use spread operator to pull out all the properties
                            // we have in that data object were fetching for a given key
                            // this can be used if we later want to edit the post
                            postsArray.push({ ...res.data[key], id: key })
                        }
                        vuexContext.commit('setPosts', postsArray)
                    })
                    .catch(e => context.error(e))
            },
            setPosts(vuexContext, posts) {
                vuexContext.commit('setPosts', posts)
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            }
        }
    })
}

export default createStore