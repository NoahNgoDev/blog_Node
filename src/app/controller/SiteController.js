const BlogNode = require('../model/CourseModel');
const { mutipleMongooseToOject } = require('../../util/mongoose');


class SiteController {

    // [GET] /news
    index(req, res, next) {

        BlogNode.find({})
            .then(BlogNode => {
                res.render('home', {
                    BlogNode: mutipleMongooseToOject(BlogNode)
                })
            })
            .catch(next)

        //res.render('home');       
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }





}

module.exports = new SiteController;