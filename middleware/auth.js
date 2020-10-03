export default function (context) {
    // check if user authenticated and if he is not, I want to redirect him
    if (!context.store.getters.isAuthenticated) {
        context.redirect('/admin/auth')
    }

}