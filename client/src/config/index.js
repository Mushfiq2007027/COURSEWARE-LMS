export const signUpFormControls = [
	{
		name: "userName",
		label: "User Name",
		placeholder: "Enter your user name",
		type: "text",
		componentType: "input",
	},
	{
		name: "userEmail",
		label: "User Email",
		placeholder: "Enter your user email",
		type: "email",
		componentType: "input",
	},
	{
		name: "password",
		label: "Password",
		placeholder: "Enter your password",
		type: "password",
		componentType: "input",
	},
];

export const signInFormControls = [
	{
		name: "userEmail",
		label: "User Email",
		placeholder: "Enter your user email",
		type: "email",
		componentType: "input",
	},
	{
		name: "password",
		label: "Password",
		placeholder: "Enter your password",
		type: "password",
		componentType: "input",
	},
];

export const initialSignInFormData = {
	userEmail: "",
	password: "",
};

export const initialSignUpFormData = {
	userName: "",
	userEmail: "",
	password: "",
};

export const yearSemesters = [
	{ id: "one-one", label: "1st Year - 1st Semester" },
	{ id: "one-two", label: "1st Year - 2nd Semester" },
	{ id: "two-one", label: "2nd Year - 1st Semester" },
	{ id: "two-two", label: "2nd Year - 2nd Semester" },
	{ id: "three-one", label: "3rd Year - 1st Semester" },
	{ id: "three-two", label: "3rd Year - 2nd Semester" },
	{ id: "four-one", label: "4th Year - 1st Semester" },
	{ id: "four-two", label: "4th Year - 2nd Semester" },
];

export const courseTypes = [
	{ id: "theoretical", label: "Theoretical" },
	{ id: "sessional", label: "Sessional" },
];

export const courseCategories = [
	{ id: "departmental", label: "Departmental Course" },
	{ id: "non-departmental", label: "Non-departmental Course" },
];

export const courseLandingPageFormControls = [
	{
		name: "courseNumber",
		label: "Course No",
		componentType: "input",
		type: "text",
		placeholder: "Enter Course No.",
	},
	{
		name: "title",
		label: "Course Title",
		componentType: "input",
		type: "text",
		placeholder: "Enter Course Title",
	},
	{
		name: "credit",
		label: "Course Credit",
		componentType: "input",
		type: "number",
		placeholder: "Enter course credit",
	},
	{
		name: "category",
		label: "Category",
		componentType: "select",
		type: "text",
		placeholder: "",
		options: courseCategories,
	},
	{
		name: "type",
		label: "Course Type",
		componentType: "select",
		type: "text",
		placeholder: "",
		options: courseTypes,
	},
	{
		name: "yearSemester",
		label: "Year-Semester",
		componentType: "select",
		type: "text",
		placeholder: "",
		options: yearSemesters,
	},
	{
		name: "subtitle",
		label: "Subtitle",
		componentType: "input",
		type: "text",
		placeholder: "Enter course subtitle",
	},
	{
		name: "description",
		label: "Description",
		componentType: "textarea",
		type: "text",
		placeholder: "Enter course description",
	},
	{
		name: "outcomes",
		label: "Outcomes",
		componentType: "textarea",
		type: "text",
		placeholder: "Enter course outcomes",
	},
	{
		name: "welcomeMessage",
		label: "Welcome Message",
		componentType: "textarea",
		placeholder: "Welcome message for students",
	},
];

export const courseLandingInitialFormData = {
	courseNumber: "",
	title: "",
	credit: "",
	category: "",
	type: "",
	yearSemester: "",
	subtitle: "",
	description: "",
	outcomes: "",
	welcomeMessage: "",
	image: "",
};

export const courseCurriculumInitialFormData = [
	{
		title: "",
		videoUrl: "",
		freePreview: false,
		public_id: "",
	},
];
