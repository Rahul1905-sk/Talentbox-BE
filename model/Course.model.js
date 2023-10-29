const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true }
  },
  {
    versionKey: false,
  }
);

const CourseModel = mongoose.model("course", courseSchema);

module.exports = {
    CourseModel,
};
