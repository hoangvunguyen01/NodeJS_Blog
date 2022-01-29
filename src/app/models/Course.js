const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String, maxlength: 255, required: true },
        desc: { type: String, maxlength: 600 },
        image: { type: String, maxlength: 600 },
        slug: { type: String, slug: 'name', unique: true },
        videoId: { type: String, maxlength: 100, required: true },
        level: { type: String, maxlength: 100 },
    },
    {
        _id: false,
        timestamps: true,
    }
);

mongoose.plugin(slug);

Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
