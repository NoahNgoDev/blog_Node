const BlogNode = require('../model/CourseModel');
const { MongooseToOject } = require('../../util/mongoose');


class CourseController {

    //[GET] /courses/:slug
    show(req, res, next) {
        BlogNode.findOne({ slug: req.params.slug })
            .then(BlogNode => {
                res.render('courses/show', { BlogNode: MongooseToOject(BlogNode) })
            })
            .catch(next)
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    //[POST] /courses/store
    store(req, res, next) {
        //res.json(req.body) //show code json ra màng hình khi post
        const formData = req.body
        formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hqdefault.jpg`
        const blognode = new BlogNode(formData)// tên đối tượng phải trùng với tên của module được xuất ra tại "model\CourseModel.js"
        blognode.save()
            .then(() => res.redirect('/me/upload/courses'))
            .catch(next)
    }


    //[GET] /courses/:id/edit
    edit(req, res, next) {
        BlogNode.findById(req.params.id)
            .then(BlogNode => {
                res.render('courses/edit', { BlogNode: MongooseToOject(BlogNode) })
            })
            .catch(next)

    }

    //[PUT] /courses/:id
    update(req, res, next) {
        BlogNode.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/upload/courses'))
            .catch(next)
    }

    //[DELETE] /courses/:id
    delete(req, res, next) {
        BlogNode.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next) {
        BlogNode.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[DELETE] /courses/:id/forceDetroy 
    forceDetroy(req, res, next) {
        BlogNode.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[POST] /courses/handle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                BlogNode.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)

                break
            default:
                res.json({ message: 'action not allowed' })
        }
    }

    //[POST] /courses/handle-form-restore-and-force
    handleFormRestoreAndForce(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                BlogNode.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'force':
                BlogNode.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({ message: 'action not allowed' })
        }

    }
}

module.exports = new CourseController();