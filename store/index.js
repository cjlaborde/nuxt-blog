import Vuex from 'vuex';

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
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        vuexContext.commit('setPosts', [
                            {
                                id: "1",
                                title: "First Post",
                                previewText: "This is our first post!",
                                thumbnail:
                                    "https://img.caixin.com/2019-07-24/1563971044321649.jpg",
                            },
                            {
                                id: "2",
                                title: "Second Post",
                                previewText: "This is our second post!",
                                thumbnail:
                                    "https://img.caixin.com/2019-07-24/1563971044321649.jpg",
                            },
                        ])
                        resolve();
                    }, 1000)
                });
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