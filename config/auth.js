// let auth = {
//     ensureAuthenticated: (request, response, next) => {
//         if (request.isAuthenticated()) return next()
//         request.flash('error_message', 'Akun Tidak Terdeteksi!')
//         response.redirect('/log/in')
//     }
// }
// auth = auth.ensureAuthenticated

// export { auth as authentication }

module.exports = {
    authentication: (request, response, next) => {
        if (request.isAuthenticated()) return next()
        request.flash('error_message', 'Akun Tidak Terdeteksi!')
        response.redirect('/log/in')
    }
}