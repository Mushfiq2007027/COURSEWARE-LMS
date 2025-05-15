import { yearSemesters } from "@/config";
import banner from "../../../../public/banner-img.webp";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
	checkCoursePurchaseInfoService,
	fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

function StudentHomepage() {
	const { auth } = useContext(AuthContext);
	const navigate = useNavigate();

	const { studentViewCoursesList, setStudentViewCoursesList } =
		useContext(StudentContext);

	function handleNavigateToCoursesPage(getCurrentId) {
		console.log(getCurrentId);
		sessionStorage.removeItem("filters");
		const currentFilter = {
			yearSemester: [getCurrentId],
		};

		sessionStorage.setItem("filters", JSON.stringify(currentFilter));

		navigate("/courses");
	}

	async function fetchAllStudentViewCourses() {
		const response = await fetchStudentViewCourseListService();
		if (response?.success) setStudentViewCoursesList(response?.data);
	}

	async function handleCourseNavigate(getCurrentCourseId) {
		const response = await checkCoursePurchaseInfoService(
			getCurrentCourseId,
			auth?.user?._id
		);

		if (response?.success) {
			if (response?.data) {
				navigate(`/course-progress/${getCurrentCourseId}`);
			} else {
				navigate(`/course/details/${getCurrentCourseId}`);
			}
		}
	}

	useEffect(() => {
		fetchAllStudentViewCourses();
	}, []);
	return (
		<div className="min-h-screen bg-white">
			<section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
				<div className="lg:w-1/2 lg:pr-12">
					<h1 className="text-4xl font-bold mb-4">
						Computer Science and Engineering
					</h1>
					<p className="text-xl">
						Learn Both Theoretical and Sessional Courses
					</p>
				</div>
				<div className="lg:w-full mb-8 lg:mb-0">
					<img
						src={banner}
						width={600}
						height={400}
						className="w-full h-auto rounded-lg shadow-lg"
					/>
				</div>
			</section>
			<section className="py-8 px-4 lg:px-8 bg-gray-100">
				<h2 className="text-2xl font-bold mb-6 text-center">
					Choose Courses According To Your Year-Semester
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
					{yearSemesters.map((yearSemesterItem) => (
						<Button
							className="justify-start"
							variant="outline"
							key={yearSemesterItem.id}
							onClick={() => handleNavigateToCoursesPage(yearSemesterItem.id)}
						>
							{yearSemesterItem.label}
						</Button>
					))}
				</div>
			</section>
			<section className="py-12 px-4 lg:px-8">
				<h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{studentViewCoursesList && studentViewCoursesList.length > 0 ? (
						studentViewCoursesList.map((courseItem) => (
							<div
								onClick={() => handleCourseNavigate(courseItem?._id)}
								className="border rounded-lg overflow-hidden shadow cursor-pointer"
							>
								<img
									src={courseItem?.image}
									width={300}
									height={150}
									className="w-full h-40 object-cover"
								/>
								<div className="p-4">
									<h3 className="font-bold mb-2">
										{courseItem?.courseNumber}: {courseItem?.title}
									</h3>
									{/* <p className="text-sm text-gray-700 mb-2">
										{courseItem?.instructorName}
									</p> */}
									<p className="font-bold text-[16px]">
										Course Credit: {courseItem?.credit}
									</p>
								</div>
							</div>
						))
					) : (
						<h1>No Courses Found</h1>
					)}
				</div>
			</section>
		</div>
	);
}

export default StudentHomepage;
