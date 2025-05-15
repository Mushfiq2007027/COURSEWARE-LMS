const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

const getAllStudentViewCourses = async (req, res) => {
	try {
		const {
			category = [],
			type = [],
			yearSemester = [],
			sortBy = "courseNumber-lowtohigh",
		} = req.query;

		let filters = {};
		if (category.length) {
			filters.category = { $in: category.split(",") };
		}
		if (type.length) {
			filters.type = { $in: type.split(",") };
		}
		if (yearSemester.length) {
			filters.yearSemester = { $in: yearSemester.split(",") };
		}

		let sortParam = {};
		switch (sortBy) {
			case "courseNumber-lowtohigh":
				sortParam.courseNumber = 1;

				break;
			case "courseNumber-hightolow":
				sortParam.courseNumber = -1;

				break;
			case "credit-lowtohigh":
				sortParam.credit = 1;

				break;
			case "credit-hightolow":
				sortParam.credit = -1;

				break;

			default:
				sortParam.courseNumber = 1;
				break;
		}

		const coursesList = await Course.find(filters).sort(sortParam);

		res.status(200).json({
			success: true,
			data: coursesList,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Some error occurred!",
		});
	}
};

const getStudentViewCourseDetails = async (req, res) => {
	try {
		const { id } = req.params;
		const courseDetails = await Course.findById(id);

		if (!courseDetails) {
			return res.status(404).json({
				success: false,
				message: "No course details found",
				data: null,
			});
		}
		res.status(200).json({
			success: true,
			data: courseDetails,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Some error occurred!",
		});
	}
};

const checkCoursePurchaseInfo = async (req, res) => {
	try {
		const { id, studentId } = req.params;
		const studentCourses = await StudentCourses.findOne({
			userId: studentId,
		});

		const ifStudentAlreadyBoughtCurrentCourse =
			studentCourses.courses.findIndex((item) => item.courseId === id) > -1;
		res.status(200).json({
			success: true,
			data: ifStudentAlreadyBoughtCurrentCourse,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Some error occurred!",
		});
	}
};

module.exports = {
	getAllStudentViewCourses,
	getStudentViewCourseDetails,
	checkCoursePurchaseInfo,
};
