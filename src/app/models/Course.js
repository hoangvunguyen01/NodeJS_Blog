const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, maxlength: 255, required: true },
        desc: { type: String, maxlength: 600 },
        image: { type: String, maxlength: 600 },
        slug: { type: String, slug: 'name', unique: true },
        videoId: { type: String, maxlength: 100, required: true },
        level: { type: String, maxlength: 100 },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Course', Course);
