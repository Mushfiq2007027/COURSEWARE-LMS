function NotFoundPage() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				textAlign: "center",
			}}
		>
			<h1
				style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}
			>
				404 Not Found
			</h1>
			<p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
				This page doesn't exist
			</p>
		</div>
	);
}

export default NotFoundPage;

/*
function NotFoundPage() {
	return <div>This page doesn't exist</div>;
}

export default NotFoundPage;
*/
