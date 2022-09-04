const newsRouter = require('./NewsRouter')
const meRouter = require('./me')
const courseRounter = require('./CoursesRouter')
const siteRouter = require('./SiteRouter')

function router(app) {
    app.use('/news', newsRouter)
    app.use('/me', meRouter)
    app.use('/courses', courseRounter)
    app.use('/', siteRouter)
}

module.exports = router