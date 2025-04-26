const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
	title: String,
	videoUrl: String,
	public_id: String,
	freePreview: Boolean,
});

const CourseSchema = new mongoose.Schema({
	instructorId: String,
	instructorName: String,
	date: Date,
	courseNumber: String,
	title: String,
	credit: Number,
	category: String,
	type: String,
	yearSemester: String,
	subtitle: String,
	description: String,
	image: String,
	welcomeMessage: String,
	outcomes: String,
	students: [
		{
			studentId: String,
			studentName: String,
			studentEmail: String,
		},
	],
	curriculum: [LectureSchema],
	isPublished: Boolean,
});

module.exports = mongoose.model("Course", CourseSchema);
