export default function (context) {
    console.log('[Middleware] Check Auth');
    //check if it running
    if (process.client) {
        context.store.dispatch("initAuth")
    }
    context.store.dispatch("initAuth");
}