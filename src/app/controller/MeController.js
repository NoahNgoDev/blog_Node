const BlogNode = require('../model/CourseModel');
const { mutipleMongooseToOject } = require('../../util/mongoose');


class MeController {



    //[GET] /me/upload/story
    uploadStory(req, res, next) {


        Promise.all([
            BlogNode.find({}).sortable(req),
            BlogNode.countDocumentsDeleted()
        ])
            .then(([BlogNode, deletedCount]) =>
                res.render('me/upload-story', {
                    deletedCount: deletedCount,
                    BlogNode: mutipleMongooseToOject(BlogNode),
                })
            )
            .catch(next)

        /** Đoạn code bên trên bằng với hai đoạn bên dưới
        BlogNode.countDocumentsDeleted()
            .then((deletedCount) => {
                console.log(deletedCount)
            })
            .catch(() => { })


        BlogNode.find({})
            .then(BlogNode => res.render('me/upload-story', {
                BlogNode: mutipleMongooseToOject(BlogNode),
            }))
            .catch(next)
        **/

    }

    trashStory(req, res, next) {
        BlogNode.findDeleted({})
            .then(BlogNode => res.render('me/trash-story', {
                BlogNode: mutipleMongooseToOject(BlogNode),
            }))
            .catch(next)
    }
}

module.exports = new MeController;