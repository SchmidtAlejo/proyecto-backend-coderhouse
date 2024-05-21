const auth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/401")
    }

    next()
}

export default auth;