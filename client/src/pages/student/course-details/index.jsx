import { Skeleton } from "@/components/ui/skeleton";
import { StudentContext } from "@/context/student-context";
import {
	checkCoursePurchaseInfoService,
	createPaymentService,
	fetchStudentViewCourseDetailsService,
} from "@/services";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Lock, PlayCircle } from "lucide-react";

import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { yearSemesters } from "@/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";

function StudentViewCourseDetailsPage() {
	const {
		studentViewCourseDetails,
		setStudentViewCourseDetails,
		currentCourseDetailsId,
		setCurrentCourseDetailsId,
		loadingState,
		setLoadingState,
	} = useContext(StudentContext);

	const { auth } = useContext(AuthContext);
	//the following is for navigating. Must import  useNavigate from react-router-dom
	const navigate = useNavigate();

	const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
		useState(null);
	const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);

	const [approvalUrl, setApprovalUrl] = useState("");

	const { id } = useParams();
	const location = useLocation();

	async function fetchStudentViewCourseDetails() {
		const checkCoursePurchaseInfoResponse =
			await checkCoursePurchaseInfoService(
				currentCourseDetailsId,
				auth?.user._id
			);

		if (
			checkCoursePurchaseInfoResponse?.success &&
			checkCoursePurchaseInfoResponse?.data
		) {
			navigate(`/course-progress/${currentCourseDetailsId}`);
			return;
		}

		const response = await fetchStudentViewCourseDetailsService(
			currentCourseDetailsId
		);
		if (response?.success) {
			setStudentViewCourseDetails(response?.data);
			setLoadingState(false);
		} else {
			setStudentViewCourseDetails(null);
			setLoadingState(false);
		}
	}

	function handleSetFreePreview(getCurrentVideoInfo) {
		console.log(getCurrentVideoInfo);
		setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
	}
	async function handleCreatePayment() {
		const paymentPayload = {
			userId: auth?.user?._id,
			userName: auth?.user?.userName,
			userEmail: auth?.user?.userEmail,
			orderStatus: "pending",
			paymentMethod: "paypal",
			paymentStatus: "initiated",
			orderDate: new Date(),
			paymentId: "",
			payerId: "",
			instructorId: studentViewCourseDetails?.instructorId,
			instructorName: studentViewCourseDetails?.instructorName,
			courseImage: studentViewCourseDetails?.image,
			courseTitle: studentViewCourseDetails?.title,
			courseId: studentViewCourseDetails?._id,
			coursePricing: studentViewCourseDetails?.credit,
		};

		console.log(paymentPayload, "paymentPayload");
		const response = await createPaymentService(paymentPayload);

		if (response.success) {
			sessionStorage.setItem(
				"currentOrderId",
				JSON.stringify(response?.data?.orderId)
			);
			setApprovalUrl(response?.data?.approveUrl);
		}
	}

	{
		/* //Directly navigate to student-courses without payment gateways
	function navigateToStudentCourses() {
		navigate("/student-courses");
	} */
	}

	useEffect(() => {
		if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true);
	}, [displayCurrentVideoFreePreview]);

	useEffect(() => {
		if (currentCourseDetailsId !== null) fetchStudentViewCourseDetails();
	}, [currentCourseDetailsId]);

	useEffect(() => {
		if (id) setCurrentCourseDetailsId(id);
	}, [id]);

	useEffect(() => {
		if (!location.pathname.includes("course/details"))
			setStudentViewCourseDetails(null), setCurrentCourseDetailsId(null);
	}, [location.pathname]);

	if (loadingState) return <Skeleton />;

	if (approvalUrl !== "") {
		window.location.href = approvalUrl;
	}

	// Find the label corresponding to the yearSemester id
	const yearSemesterLabel = yearSemesters.find(
		(ys) => ys.id === studentViewCourseDetails?.yearSemester
	)?.label;

	const getIndexOfFreePreviewUrl =
		studentViewCourseDetails !== null
			? studentViewCourseDetails?.curriculum?.findIndex(
					(item) => item.freePreview
			  )
			: -1;

	return (
		<div className=" mx-auto p-4">
			<div className="bg-gray-900 text-white p-8 rounded-t-lg">
				<h1 className="text-3xl font-bold mb-4">
					{studentViewCourseDetails?.title}
				</h1>
				<p className="text-xl mb-4">{studentViewCourseDetails?.subtitle}</p>
				<div className="flex items-center space-x-4 mt-2 text-sm">
					{/*  <span>Created By {studentViewCourseDetails?.instructorName}</span> */}
					<span className="flex items-center">
						<Calendar className="mr-1 h-4 w-4" />
						{yearSemesterLabel}
					</span>
					<span>Created On {studentViewCourseDetails?.date.split("T")[0]}</span>
					{/*  <span>
            {studentViewCourseDetails?.students.length}{" "}
            {studentViewCourseDetails?.students.length <= 1
              ? "Student"
              : "Students"}
          </span>  
        */}
				</div>
			</div>
			<div className="flex flex-col md:flex-row gap-8 mt-8">
				<main className="flex-grow">
					<Card className="mb-8">
						<CardHeader>
							<CardTitle>Learning Outcomes</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
								{studentViewCourseDetails?.outcomes
									.split(">")
									.map((outcome, index) => (
										<li key={index} className="flex items-start">
											<CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
											<span>{outcome}</span>
										</li>
									))}
							</ul>
						</CardContent>
					</Card>
					<Card className="mb-8">
						<CardHeader>
							<CardTitle>Course Description</CardTitle>
						</CardHeader>
						<CardContent>{studentViewCourseDetails?.description}</CardContent>
					</Card>
					<Card className="mb-8">
						<CardHeader>
							<CardTitle>Course Curriculum</CardTitle>
						</CardHeader>
						<CardContent>
							{studentViewCourseDetails?.curriculum?.map(
								(curriculumItem, index) => (
									<li
										className={`${
											curriculumItem?.freePreview
												? "cursor-pointer"
												: "cursor-not-allowed"
										} flex items-center mb-4`}
										onClick={
											curriculumItem?.freePreview
												? () => handleSetFreePreview(curriculumItem)
												: null
										}
									>
										{curriculumItem?.freePreview ? (
											<PlayCircle className="mr-2 h-4 w-4" />
										) : (
											<Lock className="mr-2 h-4 w-4" />
										)}
										<span>{curriculumItem?.title}</span>
									</li>
								)
							)}
						</CardContent>
					</Card>
				</main>
				<aside className="w-full md:w-[500px]">
					<Card className="sticky top-4">
						<CardContent className="p-6">
							<div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
								<VideoPlayer
									url={
										getIndexOfFreePreviewUrl !== -1
											? studentViewCourseDetails?.curriculum[
													getIndexOfFreePreviewUrl
											  ].videoUrl
											: ""
									}
									width="450px"
									height="200px"
								/>
							</div>
							<div className="mb-4">
								<span className="text-3xl font-bold">
									Course Credit:{studentViewCourseDetails?.credit}
								</span>
							</div>
							<Button
								onClick={handleCreatePayment}
								/* onClick={() =>
									navigate(
										`/course-progress/${studentViewCourseDetails?._id}`
									)
								} */
								className="w-full"
							>
								Get Better View for ${studentViewCourseDetails?.credit}
							</Button>
						</CardContent>
					</Card>
				</aside>
			</div>
			<Dialog
				open={showFreePreviewDialog}
				onOpenChange={() => {
					setShowFreePreviewDialog(false);
					setDisplayCurrentVideoFreePreview(null);
				}}
			>
				<DialogContent className="w-[800px]">
					<DialogHeader>
						<DialogTitle>Course Preview</DialogTitle>
					</DialogHeader>
					<div className="aspect-video rounded-lg flex items-center justify-center">
						<VideoPlayer
							url={displayCurrentVideoFreePreview}
							width="450px"
							height="200px"
						/>
					</div>
					<div className="flex flex-col gap-2">
						{studentViewCourseDetails?.curriculum
							?.filter((item) => item.freePreview)
							.map((filteredItem) => (
								<p
									onClick={() => handleSetFreePreview(filteredItem)}
									className="cursor-pointer text-[16px] font-medium"
								>
									{filteredItem?.title}
								</p>
							))}
					</div>
					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button type="button" variant="secondary">
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default StudentViewCourseDetailsPage;
