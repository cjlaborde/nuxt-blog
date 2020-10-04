import Vuex from 'vuex';
import Cookie from 'js-cookie';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
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
            },
            setToken(state, token) {
                state.token = token
            },
            crearToken(state) {
                state.token = null
            }
        },
        actions: {
            // Gets executed one time only on the server to have fast loading times
            // context is the payload that is always the same one you get in fetch and asyncData
            async nuxtServerInit(vuexContext, context) {
                try {
                    const res = await context.app.$axios.$get('/posts.json');
                    const postsArray = [];
                    for (const key in res) {
                        // you can store the actual id by pushing a new object
                        // where we use spread operator to pull out all the properties
                        // we have in that data object were fetching for a given key
                        // this can be used if we later want to edit the post
                        postsArray.push({ ...res[key], id: key });
                    }
                    vuexContext.commit('setPosts', postsArray);
                    return res
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
                // vuexContext.state.token
                return this.$axios
                    .$post("/posts.json?auth=" + vuexContext.state.token, createdPost)
                    .then((result) => {
                        console.log(result.name)
                        vuexContext.commit('addPost', { ...createdPost, id: result.name })
                    })
                    .catch((e) => console.log(e));
            },
            editPost(vuexContext, editedPost) {
                return this.$axios
                    .$put(
                        // https://firebase.google.com/docs/database/rest/auth
                        // editedPost will replace existing data on server
                        "/posts/" +
                        editedPost.id +
                        ".json?auth=" + vuexContext.state.token,
                        editedPost
                    )
                    .then((editedPost) => {
                        vuexContext.commit('editPost', editedPost
                        )
                    })
                    .catch((e) => console.log(e));
            },
            setPosts(vuexContext, posts) {
                vuexContext.commit('setPosts', posts)
            },
            authenticateUser(vuexContext, authData) {
                // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
                let authUrl =
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
                    process.env.fbAPIKey;
                if (!authData.isLogin) {
                    // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
                    authUrl =
                        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
                        process.env.fbAPIKey;
                }
                return this.$axios
                    .$post(authUrl, {
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true,
                    })
                    .then((result) => {
                        // console.log(result);
                        const expirationDate = new Date().getTime() + result.expiresIn * 1000;
                        vuexContext.commit('setToken', result.idToken);
                        // Create token
                        localStorage.setItem('token', result.idToken);
                        localStorage.setItem('tokenExpiration', expirationDate);

                        // Create Cookie
                        Cookie.set('jwt', result.idToken);
                        Cookie.set('expirationDate', expirationDate);

                        // expiresIn https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
                        // * 1000 since it takes time in miliseconds
                        // Invalidate token after expired time
                        vuexContext.dispatch('setLogoutTimer', result.expiresIn * 1000)
                    })
                    .catch((e) => console.log(e));
            },
            setLogoutTimer(vuexContext, duration) {
                setTimeout(() => {
                    vuexContext.commit('clearToken')
                }, duration)
            },
            initAuth(vuexContext, req) {
                let token;
                let expirationDate;
                if (req) {
                    // if request has no cookie header return
                    if (!req.headers.cookie) {
                        return;
                    }
                    // get array of different keys and find key with jwt
                    const jwtCookie = req.headers.cookie
                        .split(';')
                        .find(c => c.trim()
                            .startsWith('jwt='));
                    // if we fail getting cookie
                    if (!jwtCookie) {
                        return;
                    }
                    // get the part after the = sign
                    token = jwtCookie.split('=')[1];
                    expirationDate = req.headers.cookie
                        .split(';')
                        .find(c => c.trim()
                            .startsWith('expirationDate='))
                        .split('=')[1];

                } else {
                    token = localStorage.getItem('token');
                    expirationDate = localStorage.getItem("tokenExpiration");

                    // check if token expired or if there is no token.
                    if (new Date().getTime() > +expirationDate || !token) {
                        return
                    }
                }
                vuexContext.dispatch('setLogoutTimer', +expirationDate - new Date().getTime())
                vuexContext.commit('setToken', token)

            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state) {
                return state.token != null
            }
        }
    })
}

export default createStore