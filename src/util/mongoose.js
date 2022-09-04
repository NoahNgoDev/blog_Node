

module.exports = {
    mutipleMongooseToOject: function (mongoose) {
        return mongoose.map(mongoose => mongoose.toObject())
    },
    MongooseToOject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose
    }
}