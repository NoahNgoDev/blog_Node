const newsRouter = require('./NewsRouter')
const siteRouter = require('./SiteRouter')

function router(app) {
    app.use('/news', newsRouter)
    app.use('/', siteRouter)
}

module.exports = router