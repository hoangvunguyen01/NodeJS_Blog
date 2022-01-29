const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /stored/courses
    storedCourses(req, res, next) {
        let coursesQuery = Course.find({});
        if (req.query.hasOwnProperty('_sort')) {
            coursesQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        Promise.all([coursesQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
    // [GET] /trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
}
module.exports = new MeController();
