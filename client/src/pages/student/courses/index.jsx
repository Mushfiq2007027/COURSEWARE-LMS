import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { filterOptions, sortOptions } from "@/config";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Label } from "@/components/ui/label";
import { ArrowUpDownIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { StudentContext } from "@/context/student-context";
import { fetchStudentViewCourseListService } from "@/services";

function StudentViewCoursesPage() {
	const [sort, setSort] = useState("");
	const {
		studentViewCoursesList,
		setStudentViewCoursesList,
		//loadingState,
		//setLoadingState,
	} = useContext(StudentContext);

	async function fetchAllStudentViewCourses() {
		const response = await fetchStudentViewCourseListService();
		if (response?.success) setStudentViewCoursesList(response?.data);
	}

	useEffect(() => {
		fetchAllStudentViewCourses();
	}, []);
	return (
		<div className="w-full p-4">
			<h1 className="text-3xl font-bold mb-4">All Courses</h1>
			<div className="flex flex-col md:flex-row gap-4">
				<aside className="w-full md:w-64 space-y-4">
					<div>
						{Object.keys(filterOptions).map((keyItem) => (
							<div className="p-4 border-b">
								<h3 className="font-bold mb-3">{keyItem.toUpperCase()}</h3>
								<div className="grid gap-2 mt-2">
									{filterOptions[keyItem].map((option) => (
										<Label className="flex font-medium items-center gap-3 py-3">
											<Checkbox
												checked={false}
												//onCheckedChange={() =>
												//handleFilterOnChange(keyItem, option.id)
												//}
											/>
											{option.label}
										</Label>
									))}
								</div>
							</div>
						))}
					</div>
				</aside>
				<main className="flex-1">
					<div className="flex justify-end items-center mb-4 gap-5">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-2 p-5"
								>
									<ArrowUpDownIcon className="h-4 w-4" />
									<span className="text-[16px] font-medium">Sort By</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-[180px] border-2 border-black-500 "
							>
								<DropdownMenuRadioGroup
									value={sort}
									onValueChange={(value) => setSort(value)}
								>
									{sortOptions.map((sortItem) => (
										<DropdownMenuRadioItem
											value={sortItem.id}
											key={sortItem.id}
										>
											{sortItem.label}
										</DropdownMenuRadioItem>
									))}
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
						<span className="text-sm text-black font-bold">10 Results</span>
					</div>
					<div>
						{studentViewCoursesList && studentViewCoursesList.length > 0 ? (
							<div className="space-y-3">
								{studentViewCoursesList.map((courseItem) => (
									<Card
										//onClick={() => handleCourseNavigate(courseItem?._id)}
										className="cursor-pointer"
										key={courseItem?._id}
									>
										<CardContent className="flex gap-4 p-4">
											<div className="w-48 h-32 flex-shrink-0">
												<img
													src={courseItem?.image}
													className="w-full h-full object-cover"
												/>
											</div>
											<div className="flex-1">
												<CardTitle className="text-xl mb-2">
													{courseItem?.courseNumber}: {courseItem?.title}
												</CardTitle>
												{/* <p className="text-sm text-gray-600 mb-1">
												Created By{" "}
												<span className="font-bold">
													{courseItem?.instructorName}
												</span>
											</p> */}
												<p className="font-bold text-lg">
													Credit: {courseItem?.credit}
												</p>
												<p className="font-medium text-lg">
													{courseItem?.type} course
												</p>
												<p className="text-[16px] text-gray-900 mt-3 mb-2">
													{`${courseItem?.curriculum?.length} ${
														courseItem?.curriculum?.length <= 1
															? "Lecture"
															: "Lectures"
													}`}
												</p>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						) : (
							<h1 className="font-extrabold text-4xl">No Courses Found</h1>
						)}
					</div>
				</main>
			</div>
		</div>
	);
}

export default StudentViewCoursesPage;
