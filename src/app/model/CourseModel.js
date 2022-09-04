const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const BlogNodeSchema = new Schema({

    _id: { type: Number },
    name: { type: String, maxLength: 255, required: true },
    description: { type: String },
    image: { type: String },
    videoID: { type: String, required: true },
    level: { type: String, required: true },
    slug: { type: String, slug: 'name', unique: true },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
}, {
    _id: false,
    timestamps: true,// bằng hai dòng đã dc comment
});


//custom query helpers
BlogNodeSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc'
        })
    }
    return this
}



// Add plugins
mongoose.plugin(slug);
BlogNodeSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
})
BlogNodeSchema.plugin(AutoIncrement);

module.exports = mongoose.model('BlogNode', BlogNodeSchema);
