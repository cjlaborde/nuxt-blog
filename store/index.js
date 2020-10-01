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
            },
            addPost(state, post) {
                state.loadedPosts.push(post)
            },
            editPost(state, editedPost) {
                const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
                state.loadedPosts[postIndex] = editedPost
            }
        },
        actions: {
            // Gets executed one time only on the server to have fast loading times
            // context is the payload that is always the same one you get in fetch and asyncData
            async nuxtServerInit(vuexContext, context) {
                try {
                    const res = await axios.get('https://nuxt-blog-bee7d.firebaseio.com/posts.json');
                    const postsArray = [];
                    for (const key in res.data) {
                        // you can store the actual id by pushing a new object
                        // where we use spread operator to pull out all the properties
                        // we have in that data object were fetching for a given key
                        // this can be used if we later want to edit the post
                        postsArray.push({ ...res.data[key], id: key });
                    }
                    vuexContext.commit('setPosts', postsArray);
                } catch (e) {
                    return context.error(e);
                }
            },
            addPost(vuexContext, post) {
                const createdPost = {
                    // submited form data comming from form
                    ...post,
                    // Add the updated date
                    updatedDate: new Date(),
                }
                return axios
                    .post("https://nuxt-blog-bee7d.firebaseio.com/posts.json", createdPost)
                    .then((result) => {
                        vuexContext.commit('addPost', { ...createdPost, id: result.data.name })
                    })
                    .catch((e) => console.log(e));
            },
            editPost(vuexContext, editedPost) {
                return axios
                    .put(
                        // editedPost will replace existing data on server
                        "https://nuxt-blog-bee7d.firebaseio.com/posts/" +
                        editedPost.id +
                        ".json",
                        editedPost
                    )
                    .then((res) => {
                        vuexContext.commit('editPost', editedPost)
                    })
                    .catch((e) => console.log(e));
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